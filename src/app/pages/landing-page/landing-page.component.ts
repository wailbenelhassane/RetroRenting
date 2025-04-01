import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {CarCatalogComponent} from '../../components/car-catalog/car-catalog.component';
import {BookingBarComponent} from '../../components/booking-bar/booking-bar.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CarCatalogComponent,
    BookingBarComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {}
