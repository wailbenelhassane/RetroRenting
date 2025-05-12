import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CatalogCard } from '../../models/catalog-section.model';
import { FavoriteCarService } from '../../services/favorite-car.service';
import { CatalogSectionService } from '../../services/catalog-section.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Auth, authState } from '@angular/fire/auth';
import {IonButton, IonCard, IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  standalone: true,
  imports: [CommonModule, AsyncPipe, HeaderComponent, IonContent, IonCard, IonButton,],
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoriteCars$!: Observable<CatalogCard[]>;
  userLoggedIn: boolean = false;

  constructor(
    private favoriteCarService: FavoriteCarService,
    private catalogSectionService: CatalogSectionService,
    private auth: Auth
  ) {}

  ngOnInit() {
    authState(this.auth).subscribe(user => {
      this.userLoggedIn = !!user;
    });
    this.favoriteCars$ = this.favoriteCarService.getFavoriteCars();
  }

  onCardButtonClick(carId: string) {
    this.catalogSectionService.navigateToCarPage(carId);
  }

  toggleFavorite(carId: string) {
    if (!this.userLoggedIn) {
      alert('Please log in to favorite cars.');
      return;
    }
    this.favoriteCarService.isCarFavorited(carId).subscribe({
      next: isFavorited => {
        if (isFavorited) {
          this.favoriteCarService.removeFavoriteCar(carId).subscribe({
            error: err => {
              console.error('FavoritesPageComponent - Error removing favorite:', err);
              alert('Failed to remove favorite: ' + err.message);
            }
          });
        } else {
          this.favoriteCarService.favoriteCar(carId).subscribe({
            error: err => {
              console.error('FavoritesPageComponent - Error adding favorite:', err);
              alert('Failed to add favorite: ' + err.message);
            }
          });
        }
      },
      error: err => {
        console.error('FavoritesPageComponent - Error checking favorite status:', err);
        alert('Failed to check favorite status: ' + err.message);
      }
    });
  }
}

