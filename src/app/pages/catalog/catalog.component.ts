import {Component} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {CatalogSectionComponent} from '../../components/catalog-section/catalog-section.component';

@Component({
  selector: 'app-catalog',
  imports: [
    HeaderComponent,
    CatalogSectionComponent
  ],
  templateUrl: './catalog.component.html',
  standalone: true,
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {

}
