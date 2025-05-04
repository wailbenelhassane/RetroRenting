import { Injectable, Inject, OnDestroy, PLATFORM_ID, NgZone } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Observable, from, catchError, of, takeUntil, map, lastValueFrom } from 'rxjs';
import { Subject } from 'rxjs';
import { Car, BookingData } from '../models/booking-bar.model';
import {FormValidationService} from './utils/form-validation.service';

@Injectable({
  providedIn: 'root'
})
export class BookingBarService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private locationInputListeners: Array<() => void> = [];
  private documentClickListener: (() => void) | null = null;

  constructor(
    private firestore: Firestore,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private validationService: FormValidationService,
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

  processForm(bookingForm: FormGroup, cars: Car[]): string[] {
    const errors = this.validationService.validate(bookingForm.value, this.getBookingBarValidationSchema());
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

  private getBookingBarValidationSchema(): Record<string, string[]> {
    return {
      car: ['required'],
      location: ['required', 'location'],
      pickupDate: ['required', 'isDate', 'notPast'],
      returnDate: ['required', 'isDate', 'notPast', 'afterPickup']
    };
  }
}
