import { Injectable, OnDestroy, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { TeamImage } from '../models/team-image.model';

@Injectable({
  providedIn: 'root'
})
export class OurTeamService implements OnDestroy {
  teamImages: TeamImage[] = [];
  currentIndex = 0;
  private intervalTime = 4000;
  private autoSlide: any;
  private renderer: Renderer2;
  private destroy$ = new Subject<void>();
  private mouseEnterListener: (() => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;

  constructor(
    private firestore: Firestore,
    private ngZone: NgZone,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadTeamImages() {
    this.ngZone.run(() => {
      const teamCollection = collection(this.firestore, 'teamCarousel');
      getDocs(teamCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot && !querySnapshot.empty) {
          this.teamImages = querySnapshot.docs.map(doc => doc.data() as TeamImage);
          this.showSlide(this.currentIndex);
          this.startAutoSlide();
        } else {
          console.warn('No team images found in Firestore');
          this.teamImages = [];
        }
      }).catch((error: any) => {
        console.error('Error loading team images from Firestore:', error);
        this.teamImages = [];
      });
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
    if (this.autoSlide) {
      clearInterval(this.autoSlide);
    }
    this.autoSlide = setInterval(() => {
      this.moveSlide(1);
    }, this.intervalTime);
  }

  stopAutoSlide() {
    if (this.autoSlide) {
      clearInterval(this.autoSlide);
      this.autoSlide = null;
    }
  }

  initCarousel() {
    const carouselContainer = document.querySelector('.team-carousel') as HTMLElement;
    if (carouselContainer) {
      this.mouseEnterListener = this.renderer.listen(carouselContainer, 'mouseenter', () => {
        this.stopAutoSlide();
      });
      this.mouseLeaveListener = this.renderer.listen(carouselContainer, 'mouseleave', () => {
        this.startAutoSlide();
      });
    }
  }

  cleanupCarouselEvents() {
    if (this.mouseEnterListener) {
      this.mouseEnterListener();
      this.mouseEnterListener = null;
    }
    if (this.mouseLeaveListener) {
      this.mouseLeaveListener();
      this.mouseLeaveListener = null;
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
    this.cleanupCarouselEvents();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
