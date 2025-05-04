import {AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {HeaderService} from '../../services/header.service';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {Header} from '../../models/header.model';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy, OnInit {
  headerData$: Observable<Header | null>;
  currentUserName: string | null = null;
  private resizeCleanup?: () => void;

  constructor(
    private headerService: HeaderService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {
    this.headerData$ = this.headerService.headerData$;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserName = user.username;
      } else {
        this.currentUserName = null;
      }
    });
  }

  logout() {
    this.authService.logout();
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
