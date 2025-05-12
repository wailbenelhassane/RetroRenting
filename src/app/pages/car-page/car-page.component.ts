import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from '../../components/footer/footer.component';
import {
  BarCarDetailsBookingComponent
} from '../../components/bar-car-details-booking/bar-car-details-booking.component';
import { CarViewerComponent } from '../../components/car-viewer/car-viewer.component';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-car-page',
  standalone: true,
  imports: [
    IonicModule,
    HeaderComponent,
    FooterComponent,
    BarCarDetailsBookingComponent,
    CarViewerComponent
  ],
  templateUrl: './car-page.component.html',
  styleUrls: ['./car-page.component.scss']
})
export class CarPageComponent implements OnInit {
  carId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.carId = params.get('carId') || '';
    });
  }

  get formattedCarName(): string {
    const parts = this.carId.split('-');
    parts.pop();
    return parts
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
