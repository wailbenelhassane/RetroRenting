import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

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

@Injectable({ providedIn: 'root' })
export class BookingBarService {
  private readonly MAPBOX_API_KEY = 'pk.eyJ1IjoiZGV4YXJveiIsImEiOiJjbTdqcHFlb2UwNWEzMmpzYnhhNnl5aWhmIn0.vbHSNRoIW5vppCg59RDAFQ';

  constructor(private http: HttpClient, private router: Router) {}

  async getCars(): Promise<Car[]> {
    try {
      const data = await lastValueFrom(this.http.get<BookingBarData>('/data/bookingBar.json'));
      return data.cars || [];
    } catch (error) {
      console.error('Error loading cars data:', error);
      return [];
    }
  }

  async getLocationSuggestion(query: string): Promise<string[]> {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${this.MAPBOX_API_KEY}`;
      const response = await lastValueFrom(this.http.get<any>(url));
      return response.features.map((f: any) => f.text) || [];
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      return [];
    }
  }

  async populateCarSelect(cars: Car[], bookingForm: FormGroup): Promise<void> {
    if (cars.length > 0) {
      bookingForm.get('car')?.setValue(cars[0].value);
    }
  }

  setupLocationAutocomplete(query: string): Promise<string[]> {
    return query.length < 3 ? Promise.resolve([]) : this.getLocationSuggestion(query);
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
      location,
      formattedDate
    };

    this.saveBookingData(bookingData);
    this.router.navigate(['/car-reservation-confirmation'], {
      queryParams: {
        car_selected: carSelected,
        location,
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
    localStorage.setItem('bookingData', JSON.stringify(bookingData));
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
