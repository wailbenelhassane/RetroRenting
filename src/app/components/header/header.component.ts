import { Component, OnInit, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderService } from '../../services/header.service';
import { isPlatformBrowser } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  headerData: any;
  private resizeListener!: () => void;

  constructor(
    private headerService: HeaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadHeaderContent();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupMobileNavigation();
    }
  }

  ngOnDestroy() {
    if (this.resizeListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  loadHeaderContent() {
    this.headerService.getHeaderData().subscribe({
      next: (data) => {
        this.headerData = data;
      },
      error: (error) => {
        console.error('Error loading header data:', error);
      }
    });
  }

  setupMobileNavigation() {
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

      this.resizeListener = () => {
        if (window.innerWidth > 768) {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
        }
      };
      window.addEventListener('resize', this.resizeListener);
    } else {
      console.warn('Mobile navigation elements not found in the DOM.');
    }
  }
}
