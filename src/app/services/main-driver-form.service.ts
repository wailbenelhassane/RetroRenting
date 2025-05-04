import {Injectable, NgZone, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {collection, DocumentData, Firestore, getDocs, QuerySnapshot} from '@angular/fire/firestore';
import {Country} from '../models/main-driver-form.model';
import {FormGroup} from '@angular/forms';
import {FormValidationService} from './utils/form-validation.service';
import {BookingsService} from './booking-firebase.service';
import {getAuth} from '@angular/fire/auth';
import {Booking} from '../models/booking.model';

@Injectable({ providedIn: 'root' })
  export class MainDriverFormService{
    constructor(
      private firestore: Firestore,
      private validationService: FormValidationService,
      private bookingService: BookingsService,
      private ngZone: NgZone
    ) {}

    getAllCountries(): Observable<Country[]> {
      return new Observable<Country[]>(observer => {
        this.ngZone.run(() => {
          const countryCollection = collection(this.firestore, 'countrySelector');
          getDocs(countryCollection).then((snapshot: QuerySnapshot<DocumentData>) => {
            const countries = snapshot.docs.map(doc => doc.data() as Country);
            observer.next(countries);
            observer.complete();
          }).catch(error => {
            console.error('Error loading country data:', error);
            observer.next([]);
            observer.complete();
          });
        });
      });
    }

    getCountryPrefixes(): Observable<string[]> {
      return new Observable<string[]>(observer => {
        this.ngZone.run(() => {
          const countryCollection = collection(this.firestore, 'countrySelector');
          getDocs(countryCollection).then((snapshot: QuerySnapshot<DocumentData>) => {
            const prefixes = snapshot.docs.map(doc => (doc.data() as Country).prefix);
            observer.next(prefixes);
            observer.complete();
          }).catch(error => {
            console.error('Error loading prefixes:', error);
            observer.next([]);
            observer.complete();
          });
        });
      });
    }

    getCountryNames(): Observable<string[]> {
      return new Observable<string[]>(observer => {
        this.ngZone.run(() => {
          const countryCollection = collection(this.firestore, 'countrySelector');
          getDocs(countryCollection).then((snapshot: QuerySnapshot<DocumentData>) => {
            const names = snapshot.docs.map(doc => (doc.data() as Country).name);
            observer.next(names);
            observer.complete();
          }).catch(error => {
            console.error('Error loading country names:', error);
            observer.next([]);
            observer.complete();
          });
        });
      });
    }

  proccessForm(mainDriverForm: FormGroup): string[] {
    const errors = this.validationService.validate(mainDriverForm.value, this.getMainDriverValidationSchema());

    if (errors.length === 0) {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const bookingInfoRaw = localStorage.getItem('bookingData');
        if (!bookingInfoRaw) {
          console.error('No booking data found in localStorage');
          return ['bookingDataMissing'];
        }

        const bookingInfo = JSON.parse(bookingInfoRaw);

        const bookingData: Booking = {
          userId: user.uid,
          booking: {
            car: bookingInfo.car,
            location: bookingInfo.location,
            pickupDate: bookingInfo.formattedDate.split(' - ')[0],
            returnDate: bookingInfo.formattedDate.split(' - ')[1]
          },
          driver: {
            name: mainDriverForm.value.name,
            surname: mainDriverForm.value.surname,
            email: mainDriverForm.value.email,
            phone: mainDriverForm.value.phone,
            country: mainDriverForm.value.country
          }
        };

        this.bookingService.add(bookingData);
      } else {
        console.error('No user is currently logged in');
        return ['notLoggedIn'];
      }
    }

    return errors;
  }

    private getMainDriverValidationSchema(): Record<string, string[]> {
      return {
        name: ['required', 'name'],
        surname: ['required', 'surname'],
        email: ['required', 'email'],
        prefix: ['required'],
        phone: ['required', 'phone'],
        country: ['required']
      };
    }
  }
