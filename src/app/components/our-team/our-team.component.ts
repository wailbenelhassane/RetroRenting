import {AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {OurTeamService} from '../../services/our-team.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    public ourTeamService: OurTeamService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.ourTeamService.loadTeamImages();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ourTeamService.initCarousel();
    }
  }

  ngOnDestroy() {
    this.ourTeamService.stopAutoSlide();
    this.ourTeamService.cleanupCarouselEvents();
  }
}
