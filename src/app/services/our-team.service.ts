import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OurTeamService {
  private teamUrl = '/data/teamCarousel.json';
  currentIndex = 0;
  teamImages: { src: string, alt: string }[] = [];
  private intervalTime = 4000;
  private autoSlide: any;

  constructor(private http: HttpClient) {}

  getTeamImages(): Observable<any> {
    return this.http.get<any>(this.teamUrl).pipe(
      catchError(error => {
        console.error("Error al obtener las imágenes del carrusel:", error);
        return throwError(error);
      })
    );
  }

  loadTeamImages() {
    this.getTeamImages().subscribe({
      next: (data) => {
        if (data && data.teamImages) {
          this.teamImages = data.teamImages;
          this.showSlide(this.currentIndex);
          this.startAutoSlide();
        } else {
          console.error("No se pudieron cargar las imágenes del carrusel.");
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  showSlide(index: number) {
    this.currentIndex = index;
  }

  moveSlide(step: number) {
    this.currentIndex += step;
    if (this.currentIndex >= this.teamImages.length) {
      this.currentIndex = 0;
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.teamImages.length - 1;
    }
  }

  startAutoSlide() {
    this.autoSlide = setInterval(() => {
      this.moveSlide(1);
    }, this.intervalTime);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlide);
  }

  initCarousel() {
    const carouselContainer = document.querySelector('.team-carousel');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        this.stopAutoSlide();
      });

      carouselContainer.addEventListener('mouseleave', () => {
        this.startAutoSlide();
      });
    }
  }
}
