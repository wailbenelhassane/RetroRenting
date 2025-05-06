import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  standalone: true,
  imports: [CommonModule,],
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  today: Date = new Date();

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['']);
  }
}
