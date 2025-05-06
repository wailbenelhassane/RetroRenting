import {Component} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {ProcessBookingBarComponent} from '../../components/process-booking-bar/process-booking-bar.component';
import {MainDriverFormComponent} from '../../components/main-driver-form/main-driver-form.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-car-reservation-information',
  imports: [
    HeaderComponent,
    ProcessBookingBarComponent,
    MainDriverFormComponent,
    FooterComponent
  ],
  templateUrl: './car-reservation-information.component.html',
  styleUrl: './car-reservation-information.component.scss'
})
export class CarReservationInformationComponent {

}
