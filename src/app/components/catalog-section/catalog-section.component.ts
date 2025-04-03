import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogSectionService } from '../../services/catalog-section.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-catalog-section',
  templateUrl: './catalog-section.component.html',
  styleUrls: ['./catalog-section.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CatalogSectionComponent implements OnInit {
  catalogData$!: import('rxjs').Observable<any[]>;

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
