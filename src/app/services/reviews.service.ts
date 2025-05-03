import { Injectable, OnDestroy, NgZone, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService implements OnDestroy {
  reviewsData: Review[] = [];
  currentIndex = 0;
  isMobile: boolean = false;
  private autoplayInterval: any;
  private renderer: Renderer2;
  private destroy$ = new Subject<void>();
  private touchStartListener: (() => void) | null = null;
  private touchMoveListener: (() => void) | null = null;
  private touchEndListener: (() => void) | null = null;

  constructor(
    private firestore: Firestore,
    private ngZone: NgZone,
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  loadReviews() {
    this.ngZone.run(() => {
      const reviewsCollection = collection(this.firestore, 'reviews');
      getDocs(reviewsCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot && !querySnapshot.empty) {
          this.reviewsData = querySnapshot.docs.map(doc => doc.data() as Review);
          if (this.isMobile && isPlatformBrowser(this.platformId)) {
            this.startAutoplay();
          }
          this.updateCarousel();
        } else {
          console.warn('No reviews data found in Firestore');
          this.reviewsData = [];
        }
      }).catch((error: any) => {
        console.error('Error loading reviews data from Firestore:', error);
        this.reviewsData = [];
      });
    });
  }

  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  updateCarousel() {
    if (this.isMobile && isPlatformBrowser(this.platformId)) {
      const carouselTrack = document.querySelector('.carousel-track') as HTMLElement;
      if (carouselTrack) {
        this.renderer.setStyle(carouselTrack, 'transform', `translateX(-${this.currentIndex * 100}%)`);
      }
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.reviewsData.length;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.reviewsData.length) % this.reviewsData.length;
    this.updateCarousel();
  }

  startAutoplay() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  handleResize() {
    if (!isPlatformBrowser(this.platformId)) return;
    const wasNotMobile = !this.isMobile;
    this.isMobile = window.innerWidth <= 768;

    if (wasNotMobile !== !this.isMobile && this.reviewsData.length > 0) {
      if (this.isMobile) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
      this.updateCarousel();
    }
  }

  initTouchEvents() {
    if (!this.isMobile || !isPlatformBrowser(this.platformId)) return;

    const element = document.querySelector('.carousel-track') as HTMLElement;
    if (!element) return;

    let startX: number | null = null;
    let moveX: number | null = null;

    this.touchStartListener = this.renderer.listen(element, 'touchstart', (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    });

    this.touchMoveListener = this.renderer.listen(element, 'touchmove', (e: TouchEvent) => {
      moveX = e.touches[0].clientX;
    });

    this.touchEndListener = this.renderer.listen(element, 'touchend', () => {
      if (startX === null || moveX === null) return;

      const difference = startX - moveX;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
        this.stopAutoplay();
        this.startAutoplay();
      }
      startX = null;
      moveX = null;
    });
  }

  cleanupTouchEvents() {
    if (this.touchStartListener) {
      this.touchStartListener();
      this.touchStartListener = null;
    }
    if (this.touchMoveListener) {
      this.touchMoveListener();
      this.touchMoveListener = null;
    }
    if (this.touchEndListener) {
      this.touchEndListener();
      this.touchEndListener = null;
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
    this.cleanupTouchEvents();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
