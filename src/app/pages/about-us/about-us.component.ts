import { Component } from '@angular/core';
import {ReviewsComponent} from '../../components/reviews/reviews.component';
import {OurTeamComponent} from '../../components/our-team/our-team.component';

@Component({
  selector: 'app-about-us',
  imports: [
    ReviewsComponent,
    OurTeamComponent
  ],
  templateUrl: './about-us.component.html',
  standalone: true,
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
