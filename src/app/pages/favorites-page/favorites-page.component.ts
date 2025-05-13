import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CatalogCard } from '../../models/catalog-section.model';
import { FavoriteCarService } from '../../services/favorite-car.service';
import { CatalogSectionService } from '../../services/catalog-section.service';
import { HeaderComponent } from '../../components/header/header.component';
import { Auth, authState } from '@angular/fire/auth';
import { IonButton, IonCard, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  standalone: true,
  imports: [CommonModule, HeaderComponent, IonContent, IonCard, IonButton],
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoriteCars: CatalogCard[] = [];
  userLoggedIn = false;

  constructor(
    private favoriteCarService: FavoriteCarService,
    private catalogSectionService: CatalogSectionService,
    private auth: Auth
  ) {}

  ngOnInit() {
    authState(this.auth).subscribe(user => {
      this.userLoggedIn = !!user;
    });

    this.favoriteCarService.getFavoriteCars().subscribe(cars => {
      this.favoriteCars = cars;
    });
  }

  onCardButtonClick(carId: string) {
    this.catalogSectionService.navigateToCarPage(carId);
  }

  toggleFavorite(carId: string) {
    if (!this.userLoggedIn) {
      alert('Please log in to add favorite cars.');
      return;
    }

    const element = document.getElementById(`car-${carId}`);
    if (element) {
      element.classList.add('fade-out');
    }

    setTimeout(() => {
      this.favoriteCarService.removeFavoriteCar(carId).subscribe({
        next: () => {
          this.favoriteCars = this.favoriteCars.filter(car => car.id !== carId);
        },
        error: err => {
          console.error('Error removing favorite:', err);
          alert('Failed to remove favorite: ' + err.message);
        }
      });
    }, 300);
  }
}
