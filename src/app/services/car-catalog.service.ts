import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarCatalogService {
  private jsonUrl = '/data/carCatalog.json';

  constructor(private http: HttpClient) {}

  getCarData(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
