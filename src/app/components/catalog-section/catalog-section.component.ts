import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { CatalogSectionService } from '../../services/catalog-section.service';
import { CatalogSection } from '../../models/catalog-section.model';
import { isPlatformBrowser } from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-catalog-section',
  templateUrl: './catalog-section.component.html',
  styleUrls: ['./catalog-section.component.scss'],
  standalone: true,
  imports: [CommonModule, AsyncPipe]
})
export class CatalogSectionComponent implements OnInit {
  catalogData$!: Observable<CatalogSection[]>;

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
}
