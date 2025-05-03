import { Component, OnInit } from '@angular/core';
import {CarData, CarViewerService} from '../../services/car-viewer.service';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {async} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car-viewer',
  templateUrl: './car-viewer.component.html',
  standalone: true,
  imports: [
    NgForOf

  ],
  styleUrls: ['./car-viewer.component.scss']
})
export class CarViewerComponent implements OnInit {
  selectedCar: CarData | null = null;
  selectedCarName: string = '';
  allImages: string[] = [];
  currentIndex: number = 0;

  constructor(private carViewerService: CarViewerService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');
    if (carId) {
      const partes = carId.split('-');
    }
    this.loadImages();
  }

  private loadImages(): void {
    const carId = new URLSearchParams(window.location.search).get('carId');

    if (carId) {
      this.carViewerService.getCarData(carId).subscribe({
        next: (data) => {
          if (data) {
            this.selectedCar = data;
            this.selectedCarName = carId;
            this.allImages = [data.principal, ...data.secondary];
            this.currentIndex = 0;
          } else {
            console.warn(`No se encontró el coche con ID: ${carId}`);
          }
        },
        error: (err: any) => {
          console.error('Error loading car data:', err);
        }
      });
    }
  }
  swapWithMain(index: number): void {
    if (index === 0) return;

    const temp = this.allImages[0];
    this.allImages[0] = this.allImages[index];
    this.allImages[index] = temp;

    if (this.selectedCar) {
      this.selectedCar.principal = this.allImages[0];
    }
    this.currentIndex = 0;
  }
}
