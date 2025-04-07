// car-viewer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// car-images.interface.ts
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
  providedIn: 'root'
})


export class CarViewerService {
  constructor(private http: HttpClient) {}

  getCarImages(): Observable<CarImages> {
    return this.http.get<CarImages>('/data/images.json').pipe(
      catchError(error => {
        console.error('Error fetching car images:', error);
        return of({ images: {} }); // Retorna un objeto vacío en caso de error
      })
    );
  }
}
