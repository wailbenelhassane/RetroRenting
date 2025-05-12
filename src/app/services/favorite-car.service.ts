import { Injectable, NgZone } from '@angular/core';
import { Firestore, doc, setDoc, deleteDoc, getDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, of, firstValueFrom, combineLatest } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { CatalogCard, CatalogSection } from '../models/catalog-section.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCarService {
  private favoriteStateSubject = new BehaviorSubject<{ [carId: string]: boolean }>({});
  favoriteState$ = this.favoriteStateSubject.asObservable();

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private ngZone: NgZone
  ) {}

  private notifyFavoriteStateChange(carId: string, isFavorited: boolean) {
    const currentState = this.favoriteStateSubject.value;
    this.favoriteStateSubject.next({ ...currentState, [carId]: isFavorited });
  }

  getCurrentUserId(): Observable<string | null> {
    return from(this.ngZone.run(() => firstValueFrom(
      authState(this.auth).pipe(
        map(user => user ? user.uid : null)
      )
    )));
  }

  isCarFavorited(carId: string): Observable<boolean> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) {
          return of(false);
        }
        const carDocRef = doc(this.firestore, `users/${userId}/favoriteCars/${carId}`);
        return from(this.ngZone.run(() => getDoc(carDocRef))).pipe(
          map(snapshot => snapshot.exists()),
          catchError(err => {
            console.error('isCarFavorited - Error fetching document:', err);
            return of(false);
          })
        );
      })
    );
  }

  favoriteCar(carId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) {
          return of(void 0);
        }
        if (!carId) {
          console.error('favoriteCar - carId is undefined or empty');
          return of(void 0);
        }
        const carDocRef = doc(this.firestore, `users/${userId}/favoriteCars/${carId}`);
        return from(this.ngZone.run(() => setDoc(carDocRef, { favoritedAt: new Date() }))).pipe(
          map(() => {
            this.notifyFavoriteStateChange(carId, true);
          }),
          catchError(err => {
            console.error('favoriteCar - Error adding car to favorites:', err);
            throw err;
          })
        );
      })
    );
  }

  removeFavoriteCar(carId: string): Observable<void> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) {
          return of(void 0);
        }
        const carDocRef = doc(this.firestore, `users/${userId}/favoriteCars/${carId}`);
        return from(this.ngZone.run(() => deleteDoc(carDocRef))).pipe(
          map(() => {
            this.notifyFavoriteStateChange(carId, false);
          }),
          catchError(err => {
            console.error('removeFavoriteCar - Error removing car from favorites:', err);
            throw err;
          })
        );
      })
    );
  }

  getFavoriteCars(): Observable<CatalogCard[]> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (!userId) {
          return of([]);
        }
        const favoriteCarsRef = collection(this.firestore, `users/${userId}/favoriteCars`);
return from(this.ngZone.run(() => getDocs(favoriteCarsRef))).pipe(
  map(favoriteSnapshot => favoriteSnapshot.docs.map(doc => doc.id)),
  switchMap(carIds => {
    if (carIds.length === 0) {
      return of([]);
    }
    const cars: CatalogCard[] = [];
    const batchSize = 10;
    const batches: Observable<CatalogCard[]>[] = [];
    for (let i = 0; i < carIds.length; i += batchSize) {
      const batchIds = carIds.slice(i, i + batchSize);
      const carsRef = collection(this.firestore, 'catalogSection');
      const q = query(carsRef);
      batches.push(
        from(this.ngZone.run(() => getDocs(q))).pipe(
          map(carsSnapshot =>
            carsSnapshot.docs
              .map(doc => doc.data() as CatalogSection)
              .flatMap((section: CatalogSection) => section.catalogCards)
              .filter((card: CatalogCard) => batchIds.includes(card.id))
          )
        )
      );
    }
    return combineLatest(batches).pipe(
      map(batchResults => {
        batchResults.forEach(batch => cars.push(...batch));
        return cars;
      })
    );
  }),
  catchError(err => {
    console.error('getFavoriteCars - Error fetching favorite cars:', err);
    return of([]);
  })
);
})
);
}
}
