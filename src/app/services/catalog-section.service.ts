import { Injectable, OnDestroy, NgZone, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogSection } from '../models/catalog-section.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogSectionService implements OnDestroy {
  private catalogDataSubject = new BehaviorSubject<CatalogSection[]>([]);
  catalogData$ = this.catalogDataSubject.asObservable();
  private destroy$ = new Subject<void>();
  private renderer: Renderer2;

  constructor(
    private firestore: Firestore,
    private ngZone: NgZone,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadCatalogSections();
  }

  private loadCatalogSections() {
    this.ngZone.run(() => {
      const catalogCollection = collection(this.firestore, 'catalogSection');
      getDocs(catalogCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot && !querySnapshot.empty) {
          const catalogSections = querySnapshot.docs.map(doc => doc.data() as CatalogSection);
          this.catalogDataSubject.next(catalogSections);
        } else {
          console.warn('No catalog section data found in Firestore');
          this.catalogDataSubject.next([]);
        }
      }).catch((error: any) => {
        console.error('Error loading catalog section data from Firestore:', error);
        this.catalogDataSubject.next([]);
      });
    });
  }

  navigateToCarPage(carId: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/car-page'], { queryParams: { carId } });
    }
  }

  scrollToSection(targetId: string) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          this.renderer.setProperty(window, 'scrollTo', {
            top: targetElement.getBoundingClientRect().top + window.pageYOffset,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
