import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderService } from '../../services/header.service';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Header } from '../../models/header.model';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy, OnInit {
  headerData$: Observable<Header | null>;
  currentUser: User | null = null;
  isMobile: boolean = false;
  mobileMenuOpen: boolean = false;
  showDropdown: boolean = false;
  private resizeCleanup?: () => void;

  @ViewChild('profileMenu') profileMenu!: ElementRef;

  constructor(
    private headerService: HeaderService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {
    this.headerData$ = this.headerService.headerData$;
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user ? { ...user, profileImage: user.profileImage || '' } : null;
    });
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

  @HostListener('window:resize')
  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile && this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      this.showDropdown &&
      this.profileMenu &&
      !this.profileMenu.nativeElement.contains(event.target)
    ) {
      this.showDropdown = false;
    }
  }

  toggleMobileMenu() {
    this.headerService.toggleMobileMenu();
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      this.showDropdown = false;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    this.authService.logout();
    this.showDropdown = false;
    if (this.isMobile) {
      this.mobileMenuOpen = false;
    }
    this.router.navigate(['/']);
  }
}
