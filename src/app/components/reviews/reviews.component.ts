import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../../services/reviews.service';
import { Renderer2, RendererFactory2 } from '@angular/core';

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
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.reviewsService.loadReviews();
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.reviewsService.handleResize();
    });
  }

  ngAfterViewInit() {
    this.reviewsService.initTouchEvents();
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
