import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/firebase/booking-firebase.service';
import { Booking } from '../../models/booking.model';
import {NgForOf, NgIf} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {AuthService} from '../../services/auth/auth.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-booking-history',
  templateUrl: './history-booking.component.html',
  imports: [
    NgForOf,
    NgIf,
    HeaderComponent,
    FooterComponent
  ],
  styleUrls: ['./history-booking.component.scss']
})
export class HistoryBookingComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingsService,
              private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.bookings = await this.bookingService.getByCurrentUser(user.uid)
      }
    })
  }
}
