import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarCatalogService } from '../../services/car-catalog.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-car-catalog',
  templateUrl: './car-catalog.component.html',
  standalone: true,
  imports: [NgForOf],
  styleUrls: ['./car-catalog.component.scss']
})
export class CarCatalogComponent implements OnInit {
  decades = ['70', '80', '90'];
  currentDecadeIndex = 0;
  images: { [key: string]: string } = {};
  currentImage: { src: string; altText: string } = { src: '', altText: '' };

  constructor(
    private carCatalogService: CarCatalogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadCarData();
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  loadCarData() {
    this.carCatalogService.getCarData().subscribe({
      next: (carData) => {
        if (carData && carData.images) {
          this.images = {
            '70': this.getCarImage(carData, '70'),
            '80': this.getCarImage(carData, '80'),
            '90': this.getCarImage(carData, '90')
          };
          this.updateView(this.decades[this.currentDecadeIndex]);
        }
      },
      error: (error) => console.error('Error loading car data:', error)
    });
  }

  getCarImage(carData: any, decade: string): string {
    const cars = Object.values(carData.images[decade]);
    return cars[0] as string;
  }

  updateView(decade: string) {
    this.currentImage = {
      src: this.images[decade],
      altText: `Car image from ${decade}s`
    };
  }

  onMouseEnter(decade: string) {
    this.updateView(decade);
  }

  prevImage() {
    this.currentDecadeIndex = (this.currentDecadeIndex - 1 + this.decades.length) % this.decades.length;
    this.updateView(this.decades[this.currentDecadeIndex]);
  }

  nextImage() {
    this.currentDecadeIndex = (this.currentDecadeIndex + 1) % this.decades.length;
    this.updateView(this.decades[this.currentDecadeIndex]);
  }

  onImageClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('prev-btn') ||
      (event.target as HTMLElement).classList.contains('next-btn')) {
      return;
    }

    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 768) {
      this.nextImage();
    }
  }

  handleResize() {
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 768) {
      this.updateView(this.decades[this.currentDecadeIndex]);
    }
  }
}
