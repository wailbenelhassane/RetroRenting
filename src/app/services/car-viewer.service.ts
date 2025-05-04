import { Injectable } from '@angular/core';
import {Firestore, doc, getDoc, docData, setDoc} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CarImages {
  images: {
    [decade: string]: {
      [carName: string]: CarData;
    };
  };
}

export interface CarData {
  principal: string;
  secondary: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CarViewerService {
  constructor(private firestore: Firestore) {}

  getCarData(carName: string): Observable<CarData | null> {
    const datasetDocRef = doc(this.firestore, 'carImages/dataset');

    return docData(datasetDocRef).pipe(
      map((doc: any) => {
        const images = doc.images || {};

        for (const decade in images) {
          const carsInDecade = images[decade];
          if (carsInDecade[carName]) {
            return carsInDecade[carName] as CarData;
          }
        }

        return null;
      }),
      catchError(error => {
        console.error('Error fetching car data:', error);
        return of(null);
      })
    );
  }

}
