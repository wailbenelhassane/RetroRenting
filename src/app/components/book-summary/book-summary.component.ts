import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-book-summary',
    imports: [
        RouterLink
    ],
    templateUrl: './book-summary.component.html',
    standalone: true,
    styleUrl: './book-summary.component.scss'
})
export class BookSummaryComponent {
  @Input() carSelected: string = '';
  @Input() locationSelected: string = '';
  @Input() dateSelected: string = '';
}
