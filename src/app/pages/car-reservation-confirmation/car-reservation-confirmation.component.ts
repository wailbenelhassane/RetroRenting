import { Component } from '@angular/core';
import {ProcessBookingBarComponent} from '../../components/process-booking-bar/process-booking-bar.component';
import {BookSummaryComponent} from '../../components/book-summary/book-summary.component';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-car-reservation-confirmation',
  imports: [
    ProcessBookingBarComponent,
    BookSummaryComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './car-reservation-confirmation.component.html',
  styleUrl: './car-reservation-confirmation.component.scss'
})
export class CarReservationConfirmationComponent {

}
