import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProcessBookingBarComponent} from '../../components/process-booking-bar/process-booking-bar.component';
import {BookSummaryComponent} from '../../components/book-summary/book-summary.component';
import {HeaderComponent} from '../../components/header/header.component';
import {IonicModule} from "@ionic/angular";


@Component({
  selector: 'app-car-reservation-confirmation',
  standalone: true,
  imports: [
    ProcessBookingBarComponent,
    BookSummaryComponent,
    HeaderComponent,
    IonicModule,
  ],
  templateUrl: './car-reservation-confirmation.component.html',
  styleUrls: ['./car-reservation-confirmation.component.scss']
})
export class CarReservationConfirmationComponent implements OnInit {

  car_selected: string = '';
  location: string = '';
  pickup_date: string = '';
  return_date: string = '';
  date: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.car_selected = params.get('car_selected') ?? '';
      this.pickup_date = params.get('pickup_date') ?? '';
      this.return_date = params.get('return_date') ?? '';
      this.location = params.get('location') ?? '';

      this.date = `${this.pickup_date} - ${this.return_date}`;
    });
  }
}
