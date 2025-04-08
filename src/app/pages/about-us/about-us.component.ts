import { Component } from '@angular/core';
import {ReviewsComponent} from '../../components/reviews/reviews.component';
import {OurTeamComponent} from '../../components/our-team/our-team.component';
import {SideTextSectionComponent} from '../../components/side-text-section/side-text-section.component';
import {CenterTextSectionComponent} from '../../components/center-text-section/center-text-section.component';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-about-us',
  imports: [
    ReviewsComponent,
    OurTeamComponent,
    SideTextSectionComponent,
    CenterTextSectionComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './about-us.component.html',
  standalone: true,
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
