import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CarData, CarViewerService } from '../../services/car-viewer.service';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {IonButton} from "@ionic/angular/standalone";

@Component({
  selector: 'app-car-viewer',
  templateUrl: './car-viewer.component.html',
  standalone: true,
  imports: [NgForOf, NgIf, IonButton, NgStyle],
  styleUrls: ['./car-viewer.component.scss']
})
export class CarViewerComponent implements OnChanges {
  @Input() carId!: string;

  selectedCar: CarData | null = null;
  allImages: string[] = [];
  currentIndex = 0;
  isMobile: boolean = /Mobi|Android/i.test(navigator.userAgent);

  constructor(private carViewerService: CarViewerService) {
    this.isMobile = /Mobi|Android/i.test(navigator.userAgent);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['carId'] && this.carId) {
      this.loadImages();
    }
  }

  private loadImages(): void {
    this.carViewerService.getCarData(this.carId).subscribe({
      next: (data) => {
        if (data) {
          this.selectedCar = data;
          this.allImages = [data.principal, ...data.secondary];
          this.currentIndex = 0;
          console.log('Datos del coche cargados:', data);
        } else {
          console.warn(`No se encontró el coche con ID: ${this.carId}`);
          this.selectedCar = null;
          this.allImages = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar datos del coche:', err);
        this.selectedCar = null;
        this.allImages = [];
      }
    });
  }

  prevImage(): void {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  nextImage(): void {
    if (this.currentIndex < this.allImages.length - 1) this.currentIndex++;
  }

  goToImage(index: number): void {
    if (this.isMobile) {
      this.currentIndex = index;
    } else {
      // En web, siempre muestra la imagen principal (índice 0)
      this.currentIndex = 0;
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
