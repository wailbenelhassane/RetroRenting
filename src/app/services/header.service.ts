import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerDataSubject = new BehaviorSubject<any>(null);
  headerData$ = this.headerDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadHeaderContent();
  }

  private loadHeaderContent() {
    this.http.get('/data/header.json').pipe(
      catchError(error => {
        console.error('Error loading header data:', error);
        return of(null);
      })
    ).subscribe(data => {
      this.headerDataSubject.next(data);
    });
  }

  setupMobileNavigation(platformId: Object): () => void {
    if (!isPlatformBrowser(platformId)) return () => {};

    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const mobileNav = document.querySelector('.mobile-nav') as HTMLElement;

    if (hamburger && mobileNav) {
      const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
      };

      hamburger.addEventListener('click', toggleMenu);

      const mobileLinks = document.querySelectorAll('.mobile-navigation-item a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
      });

      const resizeListener = () => {
        if (window.innerWidth > 768) {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
        }
      };
      window.addEventListener('resize', resizeListener);

      return () => window.removeEventListener('resize', resizeListener);
    }
    return () => {};
  }

  toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const mobileNav = document.querySelector('.mobile-nav') as HTMLElement;
    if (hamburger && mobileNav) {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    }
  }
}
