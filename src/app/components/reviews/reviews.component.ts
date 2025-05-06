import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ReviewsService} from '../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, AfterViewInit, OnDestroy {
  private renderer: Renderer2;
  private resizeListener: (() => void) | null = null;

  constructor(
    public reviewsService: ReviewsService,
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.reviewsService.loadReviews();
    if (isPlatformBrowser(this.platformId)) {
      this.resizeListener = this.renderer.listen('window', 'resize', () => {
        this.reviewsService.handleResize();
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.reviewsService.initTouchEvents();
    }
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      this.resizeListener();
      this.resizeListener = null;
    }
    this.reviewsService.cleanupTouchEvents();
    this.reviewsService.stopAutoplay();
  }
}
