import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, isPlatformBrowser, NgIf } from '@angular/common';
import { CarCatalogService } from '../../services/car-catalog.service';
import { NgForOf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-catalog',
  templateUrl: './car-catalog.component.html',
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf],
  styleUrls: ['./car-catalog.component.scss']
})
export class CarCatalogComponent implements OnInit {
  decades$!: Observable<string[]>;
  currentImage$!: Observable<{ src: string; altText: string }>;
  currentDecadeIndex$!: Observable<number>;

  constructor(
    private carCatalogService: CarCatalogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.decades$ = this.carCatalogService.getDecades();
    this.currentImage$ = this.carCatalogService.getCurrentImage();
    this.currentDecadeIndex$ = this.carCatalogService.getCurrentDecadeIndex();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  onMouseEnter(decade: string) {
    this.carCatalogService.onMouseEnter(decade);
  }

  prevImage() {
    this.carCatalogService.prevImage();
  }

  nextImage() {
    this.carCatalogService.nextImage();
  }

  onImageClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('prev-btn') ||
      (event.target as HTMLElement).classList.contains('next-btn')) {
      return;
    }

    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 768) {
      this.carCatalogService.nextImage();
    }
  }

  handleResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.carCatalogService.updateViewForResize();
    }
  }
}
