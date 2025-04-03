import { Routes } from '@angular/router';
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {CatalogComponent} from './pages/catalog/catalog.component';

export const routes: Routes = [
  { path: 'index', component: LandingPageComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: '**', redirectTo: 'index' }
];
