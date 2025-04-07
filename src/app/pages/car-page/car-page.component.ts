import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from '../../components/footer/footer.component';
import {
  BarCarDetailsBookingComponent
} from '../../components/bar-car-details-booking/bar-car-details-booking.component';
import {CarViewerComponent} from '../../components/car-viewer/car-viewer.component';

@Component({
  selector: 'app-car-page',
  imports: [
    HeaderComponent,
    FooterComponent,
    BarCarDetailsBookingComponent,
    CarViewerComponent
  ],
  templateUrl: './car-page.component.html',
  styleUrl: './car-page.component.scss'
})
export class CarPageComponent {

}
