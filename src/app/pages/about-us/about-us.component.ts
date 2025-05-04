import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

import {ReviewsComponent} from '../../components/reviews/reviews.component';
import {OurTeamComponent} from '../../components/our-team/our-team.component';
import {SideTextSectionComponent} from '../../components/side-text-section/side-text-section.component';
import {CenterTextSectionComponent} from '../../components/center-text-section/center-text-section.component';
import {HeaderComponent} from '../../components/header/header.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    ReviewsComponent,
    OurTeamComponent,
    SideTextSectionComponent,
    CenterTextSectionComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  imagenDriveUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const rawUrl = 'https://drive.google.com/uc?export=view&id=1lL2cm5TApSd84zggW8igPli9wu0xC_1v';
    this.imagenDriveUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }
}
