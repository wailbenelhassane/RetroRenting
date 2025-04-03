import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogSectionService {
  private catalogDataSubject = new BehaviorSubject<any[]>([]);
  catalogData$ = this.catalogDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCatalogSections();
  }

  private loadCatalogSections() {
    this.http.get<any>('/data/catalogSection.json').pipe(
      tap(data => {
        if (data && data.decades) {
          this.catalogDataSubject.next(data.decades);
        } else {
          console.error('No se pudo cargar el JSON de las secciones.');
        }
      }),
      catchError(error => {
        console.error('Error fetching catalog data:', error);
        return of([]);
      })
    ).subscribe();
  }

  navigateToCarPage(carId: string) {
    if (typeof window !== 'undefined') {
      window.location.href = `/car-page?carId=${carId}`;
    }
  }

  scrollToSection(targetId: string) {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }
}
