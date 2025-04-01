import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {}
