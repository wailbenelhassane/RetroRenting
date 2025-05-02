import { Routes } from '@angular/router';
import { LoginComponent} from './pages/login/login.component'
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {RegisterComponent} from './pages/register/register.component';
import {CarPageComponent} from './pages/car-page/car-page.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {CarReservationConfirmationComponent} from './pages/car-reservation-confirmation/car-reservation-confirmation.component';
import {CarReservationInformationComponent} from './pages/car-reservation-information/car-reservation-information.component';

export const routes: Routes = [
  { path: 'index', component: LandingPageComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'car-reservation-confirmation', component: CarReservationConfirmationComponent },
  { path: 'car-reservation-information', component: CarReservationInformationComponent },
  { path: 'car-page', component: CarPageComponent},
  { path: '**', redirectTo: 'index' }
];
