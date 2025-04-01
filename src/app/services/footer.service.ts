import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  constructor(private http: HttpClient) {}

  getFooterData(): Observable<any> {
    return this.http.get('/data/footer.json');
  }
}
