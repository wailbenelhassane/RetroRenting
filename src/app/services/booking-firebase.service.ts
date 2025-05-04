import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Booking} from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService extends FirebaseService<Booking> {

  constructor() {
    super('bookings');
  }
}
