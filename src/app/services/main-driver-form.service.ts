import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {collection, DocumentData, Firestore, getDocs, QuerySnapshot} from '@angular/fire/firestore';
import {Country} from '../models/main-driver-form.model';
import {FormGroup} from '@angular/forms';
import {FormValidationService} from './utils/form-validation.service';

@Injectable({ providedIn: 'root' })
  export class MainDriverFormService {
    constructor(
      private firestore: Firestore,
      private validationService: FormValidationService,
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
        console.log("Booking done!");
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
