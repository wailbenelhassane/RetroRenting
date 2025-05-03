import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accessibility',
  templateUrl: 'accesibility.component.html',
  standalone: true,
  imports: [CommonModule,],
  styleUrls: ['./accesibility.component.scss']
})
export class AccessibilityComponent {
  today: Date = new Date();

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['']);
  }
}
