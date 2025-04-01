import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private http: HttpClient) {}

  getHeaderData(): Observable<any> {
    return this.http.get('/data/header.json').pipe(
      catchError(error => {
        console.error('Error loading header data:', error);
        return of(null);
      })
    );
  }
}
