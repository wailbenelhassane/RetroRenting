import { Injectable, OnDestroy, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CarCatalog } from '../models/car-catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CarCatalogService implements OnDestroy {
  private firestore: Firestore;
  private decades = new BehaviorSubject<string[]>([]);
  private currentDecadeIndex = new BehaviorSubject<number>(0);
  private imagesSubject = new BehaviorSubject<{ [key: string]: string }>({});
  private currentImageSubject = new BehaviorSubject<{ src: string; altText: string }>({ src: '', altText: '' });
  private destroy$ = new Subject<void>();

  constructor(
    firestore: Firestore,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.firestore = firestore;
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
    this.ngZone.run(() => {
      const catalogCollection = collection(this.firestore, 'carCatalog');
      getDocs(catalogCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot && !querySnapshot.empty) {
          const carData = querySnapshot.docs[0].data() as CarCatalog;
          const decadeList = Object.keys(carData);
          this.decades.next(decadeList);

          const images: { [key: string]: string } = {};
          decadeList.forEach(decade => {
            images[decade] = carData[decade].image;
          });

          this.imagesSubject.next(images);

          if (decadeList.length > 0) {
            this.updateView(decadeList[0]);
          }
        } else {
          console.warn('No car catalog data found in Firestore');
          this.decades.next([]);
          this.imagesSubject.next({});
          this.currentImageSubject.next({ src: '', altText: '' });
        }
      }).catch((error: any) => {
        console.error('Error loading car catalog data from Firestore:', error);
        this.decades.next([]);
        this.imagesSubject.next({});
        this.currentImageSubject.next({ src: '', altText: '' });
      });
    });
  }

  private updateView(decade: string) {
    const images = this.imagesSubject.value;
    this.currentImageSubject.next({
      src: images[decade] || '',
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
