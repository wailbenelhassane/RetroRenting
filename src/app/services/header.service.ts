import {inject, Injectable, OnDestroy} from '@angular/core';
import {collection, DocumentData, Firestore, getDocs, QuerySnapshot} from '@angular/fire/firestore';
import {BehaviorSubject, catchError, from, Observable, of, Subject, takeUntil} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {Header} from '../models/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService implements OnDestroy {
  private firestore: Firestore = inject(Firestore);
  private headerDataSubject = new BehaviorSubject<Header | null>(null);
  headerData$: Observable<Header | null> = this.headerDataSubject.asObservable();
  private destroy$ = new Subject<void>();

  constructor() {
    this.loadHeaderContent();
  }

  private loadHeaderContent() {
    const headerCollection = collection(this.firestore, 'header');
    from(getDocs(headerCollection)).pipe(
      catchError(error => {
        console.error('Error loading header data from Firestore:', error);
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe((querySnapshot: QuerySnapshot<DocumentData> | null) => {
      if (querySnapshot && !querySnapshot.empty) {
        const headerData = querySnapshot.docs[0].data() as Header;
        this.headerDataSubject.next(headerData);
      } else {
        console.warn('No header data found in Firestore');
        this.headerDataSubject.next(null);
      }
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

      return () => {
        window.removeEventListener('resize', resizeListener);
        hamburger.removeEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.removeEventListener('click', toggleMenu));
      };
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
