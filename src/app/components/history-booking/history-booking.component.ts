import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/firebase/booking-firebase.service';
import { Booking } from '../../models/booking.model';
import {NgForOf, NgIf} from '@angular/common';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';

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

  constructor(private bookingService: BookingsService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  async loadBookings() {
    this.bookings = await this.bookingService.getByCurrentUser();
  }
}
