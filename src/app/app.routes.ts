import { Routes } from '@angular/router';
import { LoginComponent} from './pages/login/login.component'
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {RegisterComponent} from './pages/register/register.component';

export const routes: Routes = [
  { path: 'index', component: LandingPageComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'index' }

];
