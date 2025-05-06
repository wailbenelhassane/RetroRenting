import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ad-choices',
  templateUrl: './ad-choices.component.html',
  standalone: true,
  imports: [CommonModule,],
  styleUrls: ['./ad-choices.component.scss']
})
export class AdChoicesComponent {
  today: Date = new Date();

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['']);
  }
}
