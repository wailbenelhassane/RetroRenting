import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  constructor(public reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviewsService.loadReviews();
    window.addEventListener('resize', () => this.reviewsService.handleResize());
  }

  ngAfterViewInit() {
    this.reviewsService.initTouchEvents();
  }
}
