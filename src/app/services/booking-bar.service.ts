import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

export interface Car {
  value: string;
  name: string;
}

export interface BookingData {
  car: string;
  location: string;
  formattedDate: string;
}

interface BookingBarData {
  cars: Car[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingBarService {
  private readonly MAPBOX_API_KEY = 'pk.eyJ1IjoiZGV4YXJveiIsImEiOiJjbTdqcHFlb2UwNWEzMmpzYnhhNnl5aWhmIn0.vbHSNRoIW5vppCg59RDAFQ';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async getCars(): Promise<Car[]> {
    try {
      const data = await lastValueFrom(this.http.get<BookingBarData>('/data/bookingBar.json'));
      return data.cars || [];
    } catch (error) {
      console.error("Error loading cars data:", error);
      return [];
    }
  }

  async getLocationSuggestion(query: string): Promise<string> {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${this.MAPBOX_API_KEY}`;
      const response = await lastValueFrom(this.http.get<any>(url));
      return response.features[0]?.text || '';
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
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

    locationInput.addEventListener('input', async (event) => {
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

            div.addEventListener('click', () => {
              locationInput.value = text;
              bookingForm.get('location')?.setValue(text);
              suggestionsBox.innerHTML = '';
              suggestionsBox.classList.remove('active');
            });

            div.addEventListener('mouseover', () => {
              div.style.backgroundColor = '#f0f0f0';
            });

            div.addEventListener('mouseout', () => {
              div.style.backgroundColor = 'white';
            });

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
    });

    document.addEventListener('click', (event) => {
      if (!locationInput.contains(event.target as Node) && !suggestionsBox.contains(event.target as Node)) {
        suggestionsBox.classList.remove('active');
      }
    });
  }

  processForm(bookingForm: FormGroup, cars: Car[]): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cleanAllInputs();
    const errors = this.validateFields(bookingForm.value);

    if (errors.length > 0) {
      this.displayErrors(errors);
      return;
    }

    this.processBooking(bookingForm, cars);
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

    if (!form.car) {
      errors.push('Please select a car');
    }

    if (!form.location) {
      errors.push('Please enter a location');
    }

    if (!form.pickupDate) {
      errors.push('Please select a pickup date');
    }

    if (!form.returnDate) {
      errors.push('Please select a return date');
    }

    const pickupDate = new Date(form.pickupDate);
    const returnDate = new Date(form.returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (pickupDate < today) {
      errors.push('Pickup date cannot be in the past');
    }

    if (returnDate < pickupDate) {
      errors.push('Return date must be after pickup date');
    }

    return errors;
  }

  displayErrors(errors: string[]): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const errorSection = document.getElementById('error-section');
    if (!errorSection) return;

    errorSection.innerHTML = '';

    if (errors.length > 0) {
      const errorList = document.createElement('ul');
      errorList.className = 'error-list';

      errors.forEach(error => {
        const errorItem = document.createElement('li');
        errorItem.textContent = error;
        errorList.appendChild(errorItem);

        if (error.includes('car')) {
          document.getElementById('car-selector')?.setAttribute('style', 'border-color: red');
        }
        if (error.includes('location')) {
          document.getElementById('location')?.setAttribute('style', 'border-color: red');
        }
        if (error.includes('pickup date')) {
          document.getElementById('pickup-date')?.setAttribute('style', 'border-color: red');
        }
        if (error.includes('return date') || error.includes('after pickup')) {
          document.getElementById('return-date')?.setAttribute('style', 'border-color: red');
        }
      });

      errorSection.appendChild(errorList);
    }
  }

  processBooking(bookingForm: FormGroup, cars: Car[]): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const carValue = bookingForm.get('car')?.value;
    const carSelected = this.getCarNameByValue(cars, carValue);

    const location = bookingForm.get('location')?.value;
    const pickupDate = bookingForm.get('pickupDate')?.value;
    const returnDate = bookingForm.get('returnDate')?.value;
    const formattedDate = `${pickupDate} - ${returnDate}`;

    const bookingData = {
      car: carSelected,
      location: location,
      formattedDate: formattedDate
    };

    this.saveBookingData(bookingData);
    this.router.navigate(['']);
  }

  getCarNameByValue(cars: Car[], carValue: string): string {
    const selectedCar = cars.find(car => car.value === carValue);
    return selectedCar ? selectedCar.name : "No car selected";
  }

  saveBookingData(bookingData: BookingData): void {
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  }
}
