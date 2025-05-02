import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

export interface Country {
  "countryCode": string;
  "countryName": string;
  "prefix": string;
}

@Injectable({
  providedIn: 'root'
})

export class MainDriverFormService {
  private readonly MAPBOX_API_KEY = 'pk.eyJ1IjoiZGV4YXJveiIsImEiOiJjbTdqcHFlb2UwNWEzMmpzYnhhNnl5aWhmIn0.vbHSNRoIW5vppCg59RDAFQ';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
}
