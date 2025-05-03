import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  standalone: true,
  imports: [CommonModule,],
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent {
  today: Date = new Date();

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['']);
  }
}
