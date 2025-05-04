import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Booking} from '../../models/booking.model';
import {getAuth} from 'firebase/auth';
import {collection, getDocs, query, where} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingsService extends FirebaseService<Booking> {

  constructor() {
    super('bookings');
  }

  async getByCurrentUser(): Promise<Booking[]> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return [];

    const colRef = collection(this.firestore, 'bookings');
    const q = query(colRef, where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
  }
}
