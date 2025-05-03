import { Component, OnInit } from '@angular/core';
import { BarDetailsService } from '../../services/bar-details.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-details-bar',
  imports: [
    NgForOf
  ],
  templateUrl: './details-bar.component.html',
  standalone: true,
  styleUrls: ['./details-bar.component.scss']
})
export class DetailsBarComponent implements OnInit {
  selectedCar: any;

  constructor(private barDetailsService: BarDetailsService) {
  }

  async ngOnInit(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');
    if (carId) {
      const partes = carId.split('-');
      try {
        this.selectedCar = await this.barDetailsService.getInfo(carId);
      } catch (error) {
        console.error('Error al obtener los detalles del coche:', error);
      }
    }
  }
}
