import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-process-booking-bar',
  imports: [
    NgForOf,
    NgIf,
    IonicModule
  ],
  templateUrl: './process-booking-bar.component.html',
  styleUrls: ['./process-booking-bar.component.scss'],
  standalone: true
})
export class ProcessBookingBarComponent {
  @Input() activeSteps: number[] = [1];
}
