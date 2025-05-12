import { Routes } from '@angular/router';
import { LoginComponent} from './pages/login/login.component'
import {LandingPageComponent} from './pages/landing-page/landing-page.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {RegisterComponent} from './pages/register/register.component';
import {CarPageComponent} from './pages/car-page/car-page.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {CarReservationConfirmationComponent} from './pages/car-reservation-confirmation/car-reservation-confirmation.component';
import {CarReservationInformationComponent} from './pages/car-reservation-information/car-reservation-information.component';
import {AccessibilityComponent} from './pages/footer-pages/accesibility/accesibility.component';
import {PrivacyPolicyComponent} from './pages/footer-pages/privacy-policy/privacy-policy.component';
import {AdChoicesComponent} from './pages/footer-pages/ad-choices/ad-choices.component';
import {TermsConditionsComponent} from './pages/footer-pages/terms-conditions/terms-conditions.component';
import {AuthGuard} from './guards/auth.guard';
import {HistoryBookingComponent} from './pages/history-booking/history-booking.component';
import {FavoritesPageComponent} from "./pages/favorites-page/favorites-page.component";

let FavoritesComponent;
export const routes: Routes = [
  { path: 'index', component: LandingPageComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'car-reservation-confirmation',
    canActivate: [AuthGuard],
    component: CarReservationConfirmationComponent },
  { path: 'car-reservation-information',
    canActivate: [AuthGuard],
    component: CarReservationInformationComponent },
  { path: 'car-page', component: CarPageComponent},
  { path: 'my-bookings',
    canActivate: [AuthGuard],
    component: HistoryBookingComponent },
  { path: 'accessibility', component: AccessibilityComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'ad-choices', component: AdChoicesComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '**', redirectTo: 'index' }
];
