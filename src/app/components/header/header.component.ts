import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../services/header.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  headerData$!: import('rxjs').Observable<any>;
  private resizeCleanup!: () => void;

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

  toggleMobileMenu() {
    this.headerService.toggleMobileMenu();
  }
}
