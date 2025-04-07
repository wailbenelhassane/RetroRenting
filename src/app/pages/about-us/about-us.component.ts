import { Component } from '@angular/core';
import {ReviewsComponent} from '../../components/reviews/reviews.component';

@Component({
  selector: 'app-about-us',
  imports: [
    ReviewsComponent
  ],
  templateUrl: './about-us.component.html',
  standalone: true,
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
