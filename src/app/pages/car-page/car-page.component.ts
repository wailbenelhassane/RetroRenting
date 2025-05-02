import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from '../../components/footer/footer.component';
import {
  BarCarDetailsBookingComponent
} from '../../components/bar-car-details-booking/bar-car-details-booking.component';
import {CarViewerComponent} from '../../components/car-viewer/car-viewer.component';
import {ActivatedRoute} from '@angular/router';

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
  carId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.carId = params.get('carId') || '';
    });
  }

  get formattedCarName(): string {
    const parts = this.carId.split('-');
    parts.pop(); // Elimina la última parte (normalmente el año)
    return parts
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
