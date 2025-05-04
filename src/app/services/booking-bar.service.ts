import { Injectable, Inject, OnDestroy, PLATFORM_ID, NgZone } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Observable, from, catchError, of, takeUntil, map, lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs';
import { Car, BookingData } from '../models/booking-bar.model';

@Injectable({
  providedIn: 'root'
})
export class BookingBarService implements OnDestroy {
  private readonly MAPBOX_API_KEY = 'pk.eyJ1IjoiZGV4YXJveiIsImEiOiJjbTdqcHFlb2UwNWEzMmpzYnhhNnl5aWhmIn0.vbHSNRoIW5vppCg59RDAFQ';
  private destroy$ = new Subject<void>();
  private locationInputListeners: Array<() => void> = [];
  private documentClickListener: (() => void) | null = null;

  constructor(
    private firestore: Firestore,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getCars(): Observable<Car[]> {
    return new Observable<Car[]>(observer => {
      this.ngZone.run(() => {
        const bookingBarCollection = collection(this.firestore, 'booking-bar');
        getDocs(bookingBarCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
          if (querySnapshot && !querySnapshot.empty) {
            const cars = querySnapshot.docs.map(doc => doc.data() as Car);
            observer.next(cars);
            observer.complete();
          } else {
            console.warn('No booking bar data found in Firestore');
            observer.next([]);
            observer.complete();
          }
        }).catch((error: any) => {
          console.error('Error loading booking bar data from Firestore:', error);
          observer.next([]);
          observer.complete();
        });
      });
    }).pipe(
      takeUntil(this.destroy$)
    );
  }

    async getLocationSuggestion(query: string): Promise<string> {
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${this.MAPBOX_API_KEY}`;
        const response = await lastValueFrom(this.http.get<any>(url));
        return response.features[0]?.text || '';
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        return '';
      }
    }

    async populateCarSelect(cars: Car[], bookingForm: FormGroup): Promise<void> {
      try {
        if (cars.length > 0) {
      bookingForm.get('car')?.setValue(cars[0].value);

      if (isPlatformBrowser(this.platformId)) {
        const carSelector = document.getElementById('car-selector') as HTMLSelectElement;
        if (carSelector) {
          carSelector.innerHTML = '';
          cars.forEach(car => {
            const option = document.createElement('option');
            option.value = car.value;
            option.text = car.name;
            carSelector.appendChild(option);
          });
        }
      }
    }
  } catch (error) {
      console.error("Can't load cars data", error);
    }
  }

  setupLocationAutocomplete(bookingForm: FormGroup): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const locationInput = document.getElementById('location') as HTMLInputElement;
    const suggestionsBox = document.getElementById('suggestions-box') as HTMLDivElement;

    if (!locationInput || !suggestionsBox) return;

    const handleInput = async (event: Event) => {
      const query = (event.target as HTMLInputElement).value;
      if (query.length > 2) {
        try {
          const suggestion = await this.getLocationSuggestion(query);
          const suggestions = suggestion ? [suggestion] : [];
          suggestionsBox.innerHTML = '';

          suggestions.forEach(text => {
            const div = document.createElement('div');
            div.textContent = text;
            div.style.padding = '8px 10px';
            div.style.cursor = 'pointer';

            const handleClick = () => {
              locationInput.value = text;
              bookingForm.get('location')?.setValue(text);
              suggestionsBox.innerHTML = '';
              suggestionsBox.classList.remove('active');
            };

            const handleMouseOver = () => {
              div.style.backgroundColor = '#f0f0f0';
            };

            const handleMouseOut = () => {
              div.style.backgroundColor = 'white';
            };

            div.addEventListener('click', handleClick);
            div.addEventListener('mouseover', handleMouseOver);
            div.addEventListener('mouseout', handleMouseOut);

            this.locationInputListeners.push(
              () => div.removeEventListener('click', handleClick),
              () => div.removeEventListener('mouseover', handleMouseOver),
              () => div.removeEventListener('mouseout', handleMouseOut)
            );

            suggestionsBox.appendChild(div);
          });

          if (suggestions.length > 0) {
            suggestionsBox.classList.add('active');
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('active');
      }
    };

    const handleDocumentClick = (event: Event) => {
      if (!locationInput.contains(event.target as Node) && !suggestionsBox.contains(event.target as Node)) {
        suggestionsBox.classList.remove('active');
      }
    };

    locationInput.addEventListener('input', handleInput);
    document.addEventListener('click', handleDocumentClick);

    this.locationInputListeners.push(() => locationInput.removeEventListener('input', handleInput));
    this.documentClickListener = () => document.removeEventListener('click', handleDocumentClick);
  }

  cleanAllInputs(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const inputs = document.querySelectorAll('#booking-bar-form input, #booking-bar-form select');
    inputs.forEach(input => {
      (input as HTMLElement).style.borderColor = '';
    });
  }

  validateFields(form: any): string[] {
    const errors: string[] = [];

    if (!this.isValidCar(form.car)) errors.push('car');
    if (!this.isValidLocation(form.location)) errors.push('location');
    if (form.location && !this.isLocationFormatValid(form.location)) errors.push('locationInvalid');
    if (!this.isValidDate(form.pickupDate)) errors.push('pickupDate');
    if (!this.isValidDate(form.returnDate)) errors.push('returnDate');
    if (this.isPastDate(form.pickupDate)) errors.push('pickupDatePast');
    if (this.isPastDate(form.returnDate)) errors.push('returnDatePast');
    if (this.isReturnBeforePickup(form.pickupDate, form.returnDate)) errors.push('returnBeforePickup');

    return errors;
  }

  processForm(bookingForm: FormGroup, cars: Car[]): string[] {
    const errors = this.validateFields(bookingForm.value);
    if (errors.length > 0) return errors;

    this.processBooking(bookingForm, cars);
    return [];
  }

  processBooking(bookingForm: FormGroup, cars: Car[]): void {
    const carValue = bookingForm.get('car')?.value;
    const carSelected = this.getCarNameByValue(cars, carValue);
    const location = bookingForm.get('location')?.value;
    const pickupDate = bookingForm.get('pickupDate')?.value;
    const returnDate = bookingForm.get('returnDate')?.value;
    const formattedDate = `${pickupDate} - ${returnDate}`;

    const bookingData: BookingData = {
      car: carSelected,
      location: location,
      formattedDate: formattedDate
    };

    this.saveBookingData(bookingData);
    this.router.navigate(['/car-reservation-confirmation'], {
      queryParams: {
        car_selected: carSelected,
        location: location,
        pickup_date: pickupDate,
        return_date: returnDate
      }
    });
  }

  getCarNameByValue(cars: Car[], carValue: string): string {
    const selectedCar = cars.find(car => car.value === carValue);
    return selectedCar ? selectedCar.name : 'No car selected';
  }

  saveBookingData(bookingData: BookingData): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
    }
  }

  ngOnDestroy() {
    this.locationInputListeners.forEach(cleanup => cleanup());
    if (this.documentClickListener) {
      this.documentClickListener();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      car: 'Please select a car.',
      location: 'Please enter a location.',
      locationInvalid: 'Location cannot contain numbers or special characters.',
      pickupDate: 'Please select a pickup date.',
      returnDate: 'Please select a return date.',
      pickupDatePast: 'Pickup date cannot be in the past.',
      returnDatePast: 'Return date cannot be in the past.',
      returnBeforePickup: 'Return date must be after pickup date.'
    };
    return messages[code] || 'Unknown error';
  }

  private isValidCar(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  private isValidLocation(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  private isLocationFormatValid(value: string): boolean {
    return /^[a-zA-Z\s]+$/.test(value);
  }

  private isValidDate(value: string): boolean {
    return !!value && !isNaN(Date.parse(value));
  }

  private isPastDate(value: string): boolean {
    if (!this.isValidDate(value)) return false;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  private isReturnBeforePickup(pickup: string, dropoff: string): boolean {
    if (!this.isValidDate(pickup) || !this.isValidDate(dropoff)) return false;
    return new Date(dropoff) < new Date(pickup);
  }
}
