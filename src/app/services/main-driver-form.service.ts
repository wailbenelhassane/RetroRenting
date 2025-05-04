import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {collection, DocumentData, Firestore, getDocs, QuerySnapshot} from '@angular/fire/firestore';
import {Country} from '../models/main-driver-form.model';

@Injectable({ providedIn: 'root' })
export class MainDriverFormService {
  constructor(
    private firestore: Firestore,
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


  validateFields(form: any): string[] {
    const errors: string[] = [];

    if (!this.isValuePresent(form.name)) errors.push('name');
    else if (!this.isValidName(form.name)) errors.push('invalidName');

    if (!this.isValuePresent(form.surname)) errors.push('surname');
    else if (!this.isValidName(form.surname)) errors.push('invalidSurName');

    if (!this.isValuePresent(form.email)) errors.push('email');
    else if (!this.isValidEmail(form.email)) errors.push('invalidEmail');

    if (!this.isValuePresent(form.prefix)) errors.push('prefix');

    if (!this.isValuePresent(form.phone)) errors.push('phone');
    else if (!this.isValidPhone(form.phone)) errors.push('invalidPhone');

    if (!this.isValuePresent(form.country)) errors.push('country');

    return errors;
  }

  getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      name: 'Please enter your name.',
      surname: 'Please enter your surname.',
      email: 'Please enter your email.',
      prefix: 'Please select a country code.',
      phone: 'Please enter your phone number.',
      country: 'Please select your country.',
      invalidName: 'Wrong name format: must start with a capital letter and only letters.',
      invalidSurName: 'Wrong surname format: must start with a capital letter and only letters.',
      invalidEmail: 'Wrong email format, correct format: example@domain.com.',
      invalidPhone: 'Phone must be 9–15 digits, only numbers.'
    };
    return messages[code] || 'Unknown error';
  }

  private isValuePresent(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  private isValidName(value: string): boolean {
    return /^[A-ZÁÉÍÓÚÑ][a-záéíóúñÁÉÍÓÚÑ]*(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñÁÉÍÓÚÑ]*)*$/.test(value?.trim());
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value?.trim());
  }

  private isValidPhone(value: string): boolean {
    return /^(\d\s?){9,15}$/.test(value.trim());
  }
}
