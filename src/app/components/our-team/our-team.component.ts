import { Component, OnInit, AfterViewInit } from '@angular/core';
import{CommonModule} from '@angular/common';
import { OurTeamService } from '../../services/our-team.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit, AfterViewInit {
  constructor(public ourTeamService: OurTeamService) {}

  ngOnInit() {
    this.ourTeamService.loadTeamImages();
  }

  ngAfterViewInit() {
    this.ourTeamService.initCarousel();
  }
}
