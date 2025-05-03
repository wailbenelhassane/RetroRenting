import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurTeamService } from '../../services/our-team.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public ourTeamService: OurTeamService) {}

  ngOnInit() {
    this.ourTeamService.loadTeamImages();
  }

  ngAfterViewInit() {
    this.ourTeamService.initCarousel();
  }

  ngOnDestroy() {
    this.ourTeamService.stopAutoSlide();
    this.ourTeamService.cleanupCarouselEvents();
  }
}
