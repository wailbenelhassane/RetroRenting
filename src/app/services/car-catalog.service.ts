import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarCatalogService {
  private jsonUrl = '/data/carCatalog.json';
  private decades = new BehaviorSubject<string[]>([]);
  private currentDecadeIndex = new BehaviorSubject<number>(0);
  private imagesSubject = new BehaviorSubject<{ [key: string]: string }>({});
  private currentImageSubject = new BehaviorSubject<{ src: string; altText: string }>({ src: '', altText: '' });

  constructor(private http: HttpClient) {
    this.loadCarData();
  }

  getDecades(): Observable<string[]> {
    return this.decades.asObservable();
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
          const decadeList = Object.keys(carData.images);
          this.decades.next(decadeList);

          const images: { [key: string]: string } = {};
          decadeList.forEach(decade => {
            images[decade] = this.getCarImage(carData, decade);
          });

          this.imagesSubject.next(images);

          if (decadeList.length > 0) {
            this.updateView(decadeList[0]);
          }
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
    const decadeList = this.decades.value;
    const newIndex = (this.currentDecadeIndex.value - 1 + decadeList.length) % decadeList.length;
    this.currentDecadeIndex.next(newIndex);
    this.updateView(decadeList[newIndex]);
  }

  nextImage() {
    const decadeList = this.decades.value;
    const newIndex = (this.currentDecadeIndex.value + 1) % decadeList.length;
    this.currentDecadeIndex.next(newIndex);
    this.updateView(decadeList[newIndex]);
  }

  onMouseEnter(decade: string) {
    const decadeList = this.decades.value;
    const index = decadeList.indexOf(decade);
    if (index !== -1) {
      this.currentDecadeIndex.next(index);
    }
    this.updateView(decade);
  }

  updateViewForResize() {
    const decadeList = this.decades.value;
    if (decadeList.length > 0) {
      this.updateView(decadeList[this.currentDecadeIndex.value]);
    }
  }
}
