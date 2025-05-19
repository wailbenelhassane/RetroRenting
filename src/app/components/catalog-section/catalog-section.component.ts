import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CatalogSectionService } from '../../services/catalog-section.service';
import { FavoriteCarService } from '../../services/favorite-car.service';
import { Auth, authState } from '@angular/fire/auth';
import { CatalogSection } from '../../models/catalog-section.model';
import {IonButton, IonCard, IonContent} from "@ionic/angular/standalone";
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'app-catalog-section',
  templateUrl: './catalog-section.component.html',
  standalone: true,
  imports: [CommonModule, AsyncPipe, IonCard, IonButton],
  styleUrls: ['./catalog-section.component.scss']
})
export class CatalogSectionComponent implements OnInit, OnDestroy {
  catalogData$!: Observable<CatalogSection[]>;
  isCarFavorited: { [key: string]: Observable<boolean> } = {};
  userLoggedIn: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private catalogSectionService: CatalogSectionService,
    private favoriteCarService: FavoriteCarService,
    private auth: Auth,
    private databaseService: DatabaseService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.catalogData$ = this.catalogSectionService.catalogData$;
  }

  ngOnInit() {
    authState(this.auth).pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.userLoggedIn = !!user;
    });
    this.catalogData$.pipe(takeUntil(this.destroy$)).subscribe(sections => {
      sections.forEach(section => {
        section.catalogCards.forEach(card => {
          this.isCarFavorited[card.id] = this.favoriteCarService.isCarFavorited(card.id);
        });
      });
    });
    this.favoriteCarService.favoriteState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      Object.keys(state).forEach(carId => {
        this.isCarFavorited[carId] = this.favoriteCarService.isCarFavorited(carId);
      });
    });

    if (isPlatformBrowser(this.platformId) && window.location.hash) {
      this.catalogSectionService.scrollToSection(window.location.hash.substring(1));
    }
  }

  onCardButtonClick(carId: string) {
    this.catalogSectionService.navigateToCarPage(carId);
  }

  toggleFavorite(carId: string) {
    if (!this.userLoggedIn) {
      alert('Por favor, inicia sesión para añadir a favoritos.');
      return;
    }

    this.favoriteCarService.isCarFavorited(carId).subscribe({
      next: isFavorited => {
        const operation = isFavorited
          ? this.favoriteCarService.removeFavoriteCar(carId)
          : this.favoriteCarService.favoriteCar(carId);

        operation.subscribe({
          next: async () => {
            try {
              if (isFavorited) {
                await this.databaseService.removeFavorite(carId);
              } else {
                await this.databaseService.addFavorite(carId);
              }
            } catch (dbErr) {
              console.error('Error actualizando base de datos local:', dbErr);
            }
          },
          error: err => {
            console.error(`CatalogSectionComponent - Error ${isFavorited ? 'removing' : 'adding'} favorite:`, err);
            alert(`Error al ${isFavorited ? 'eliminar de' : 'añadir a'} favoritos: ${err.message}`);
          }
        });
      },
      error: err => {
        console.error('CatalogSectionComponent - Error checking favorite status:', err);
        alert('Error al verificar estado de favorito: ' + err.message);
      }
    });
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
