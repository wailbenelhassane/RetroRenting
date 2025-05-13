import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-book-summary',
  standalone: true,
  imports: [
    RouterLink,
    IonicModule
  ],
  templateUrl: './book-summary.component.html',
  styleUrls: ['./book-summary.component.scss']
})
export class BookSummaryComponent {
  @Input() carSelected: string = '';
  @Input() locationSelected: string = '';
  @Input() dateSelected: string = '';
}
