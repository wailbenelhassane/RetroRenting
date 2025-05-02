// car-viewer.component.ts
import { Component, OnInit } from '@angular/core';
import {CarData, CarViewerService} from '../../services/car-viewer.service';
import {NgOptimizedImage} from '@angular/common';
import {async} from 'rxjs';

@Component({
  selector: 'app-car-viewer',
  templateUrl: './car-viewer.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrls: ['./car-viewer.component.scss']
})
export class CarViewerComponent implements OnInit {
  carImages: { [decade: string]: { [carName: string]: CarData } } = {};
  selectedCar: CarData | null = null;
  selectedCarName: string = '';
  allImages: string[] = []; // Todas las imágenes del auto seleccionado (principal + secundarias)
  currentIndex: number = 0;

  constructor(private carViewerService: CarViewerService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  // car-viewer.component.ts
  private loadImages(): void {
    this.carViewerService.getCarImages().subscribe({
      next: (data: { images: { [decade: string]: { [carName: string]: CarData } } }) => {
        this.carImages = data.images;
        this.selectCar('70', 'chevrolet-camaro-70');
      },
      error: (err: any) => {
        console.error('Error loading images:', err);
      }
    });
  }

  selectCar(decade: string, carName: string): void {
    this.selectedCar = this.carImages[decade][carName];
    this.selectedCarName = carName;
    this.allImages = [this.selectedCar.principal, ...this.selectedCar.secondary];
    this.currentIndex = 0; // Reiniciar el índice al cambiar de auto
  }


  protected readonly async = async;
}
