import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-process-booking-bar',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './process-booking-bar.component.html',
  styleUrl: './process-booking-bar.component.scss',
  standalone: true
})

export class ProcessBookingBarComponent {
  @Input() activeSteps: number[] = [1];
}
