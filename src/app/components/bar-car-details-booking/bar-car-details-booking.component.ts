import {Component} from '@angular/core';
import {BookingBarComponent} from '../booking-bar/booking-bar.component';
import {NgIf} from '@angular/common';
import {DetailsBarComponent} from '../details-bar/details-bar.component';

@Component({
  selector: 'app-bar-car-details-booking',
  imports: [
    BookingBarComponent,
    NgIf,
    DetailsBarComponent
  ],
  templateUrl: './bar-car-details-booking.component.html',
  standalone: true,
  styleUrl: './bar-car-details-booking.component.scss'
})
export class BarCarDetailsBookingComponent {
  activeSection: 'car-details' | 'book-now' = 'book-now';

  showSection(section: 'car-details' | 'book-now'): void {
    this.activeSection = section;
  }
}
