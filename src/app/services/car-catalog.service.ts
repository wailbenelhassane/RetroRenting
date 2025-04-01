import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarCatalogService {
  private jsonUrl = '/data/carCatalog.json';
  private decades = ['70', '80', '90'];
  private currentDecadeIndex = new BehaviorSubject<number>(0);
  private imagesSubject = new BehaviorSubject<{ [key: string]: string }>({});
  private currentImageSubject = new BehaviorSubject<{ src: string; altText: string }>({ src: '', altText: '' });

  constructor(private http: HttpClient) {
    this.loadCarData();
  }


  getCurrentImage(): Observable<{ src: string; altText: string }> {
    return this.currentImageSubject.asObservable();
  }

  getCurrentDecadeIndex(): Observable<number> {
    return this.currentDecadeIndex.asObservable();
  }

  private loadCarData() {
    this.http.get(this.jsonUrl).subscribe({
      next: (carData: any) => {
        if (carData && carData.images) {
          const images = {
            '70': this.getCarImage(carData, '70'),
            '80': this.getCarImage(carData, '80'),
            '90': this.getCarImage(carData, '90')
          };
          this.imagesSubject.next(images);
          this.updateView(this.decades[this.currentDecadeIndex.value]);
        }
      },
      error: (error) => console.error('Error loading car data:', error)
    });
  }

  private getCarImage(carData: any, decade: string): string {
    const cars = Object.values(carData.images[decade]);
    return cars[0] as string;
  }


  private updateView(decade: string) {
    const images = this.imagesSubject.value;
    this.currentImageSubject.next({
      src: images[decade],
      altText: `Car image from ${decade}s`
    });
  }


  prevImage() {
    const newIndex = (this.currentDecadeIndex.value - 1 + this.decades.length) % this.decades.length;
    this.currentDecadeIndex.next(newIndex);
    this.updateView(this.decades[newIndex]);
  }

  nextImage() {
    const newIndex = (this.currentDecadeIndex.value + 1) % this.decades.length;
    this.currentDecadeIndex.next(newIndex);
    this.updateView(this.decades[newIndex]);
  }


  onMouseEnter(decade: string) {
    this.updateView(decade);
  }

  updateViewForResize() {
    this.updateView(this.decades[this.currentDecadeIndex.value]);
  }
}
