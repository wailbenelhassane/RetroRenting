import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { CatalogSectionService } from '../../services/catalog-section.service';
import { CatalogSection } from '../../models/catalog-section.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-catalog-section',
  templateUrl: './catalog-section.component.html',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  styleUrls: ['./catalog-section.component.scss']
})
export class CatalogSectionComponent implements OnInit, OnDestroy {
  catalogData$!: Observable<CatalogSection[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private catalogSectionService: CatalogSectionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.catalogData$ = this.catalogSectionService.catalogData$;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && window.location.hash) {
      this.catalogSectionService.scrollToSection(window.location.hash.substring(1));
    }
  }

  onCardButtonClick(carId: string) {
    this.catalogSectionService.navigateToCarPage(carId);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
