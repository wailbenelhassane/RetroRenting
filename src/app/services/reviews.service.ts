import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsUrl = '/data/reviews.json';
  currentIndex = 0;
  reviewsData: any[] = [];
  autoplayInterval: any;
  isMobile = window.innerWidth <= 768;

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.reviewsUrl).pipe(
      catchError(error => {
        console.error("Error while loading the reviews", error);
        return throwError(error);
      })
    );
  }

  loadReviews() {
    this.getReviews().subscribe({
      next: (data) => {
        this.reviewsData = data;
        if (this.isMobile) {
          this.startAutoplay();
        }
        this.updateCarousel();
      },
      error: (error) => {
        console.error(error);
        const reviewsContainer = document.querySelector(".reviews");
        if (reviewsContainer) {
          reviewsContainer.innerHTML = "<p style='color: white;'>No se pudieron cargar las reseñas.</p>";
        }
      }
    });
  }

  getStars(rating: number): string {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  updateCarousel() {
    if (this.isMobile) {
      const carouselTrack = document.querySelector(".carousel-track") as HTMLElement;
      if (carouselTrack) {
        carouselTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
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
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  handleResize() {
    const wasNotMobile = !this.isMobile;
    this.isMobile = window.innerWidth <= 768;

    if (wasNotMobile !== !this.isMobile && this.reviewsData.length > 0) {
      if (this.isMobile) {
        this.startAutoplay();
      } else if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
      this.updateCarousel();
    }
  }

  initTouchEvents() {
    const element = document.querySelector('.carousel-track') as HTMLElement;
    if (!element || !this.isMobile) return;

    let startX: number, moveX: number;

    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
      moveX = e.touches[0].clientX;
    }, { passive: true });

    element.addEventListener('touchend', () => {
      if (!startX || !moveX) return;

      const difference = startX - moveX;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
        if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
          this.startAutoplay();
        }
      }
    });
  }
}
