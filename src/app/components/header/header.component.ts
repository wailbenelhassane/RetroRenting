import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../services/header.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Header } from '../../models/header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  headerData$: Observable<Header | null>;
  private resizeCleanup?: () => void;

  constructor(
    private headerService: HeaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.headerData$ = this.headerService.headerData$;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeCleanup = this.headerService.setupMobileNavigation(this.platformId);
    }
  }

  ngOnDestroy() {
    if (this.resizeCleanup && isPlatformBrowser(this.platformId)) {
      this.resizeCleanup();
    }
  }
}
