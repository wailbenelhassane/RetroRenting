import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Booking } from '../../models/booking.model';
import { collection, getDocs, query, where } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService extends FirebaseService<Booking> {

  constructor(private authService: AuthService) {
    super('bookings');
  }

  async getByCurrentUser(uid: string): Promise<Booking[]> {
    console.log(uid);
    if (uid) {
      const colRef = collection(this.firestore, 'bookings');
      const q = query(colRef, where('userId', '==', uid));
      const snapshot = await getDocs(q);
      console.log(snapshot);
      console.log(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Booking)));
      return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Booking));
    }

    return [];
  }
}
