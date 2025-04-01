import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Car {
  value: string;
  name: string;
}

interface BookingBarData {
  cars: Car[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingBarService {
  private readonly MAPBOX_API_KEY = 'pk.eyJ1IjoiZGV4YXJveiIsImEiOiJjbTdqcHFlb2UwNWEzMmpzYnhhNnl5aWhmIn0.vbHSNRoIW5vppCg59RDAFQ';

  constructor(private http: HttpClient) {}

  async getCars(): Promise<Car[]> {
    try {
      const data = await lastValueFrom(this.http.get<BookingBarData>('/data/bookingBar.json'));
      return data.cars || [];
    } catch (error) {
      console.error("Error loading cars data:", error);
      return [];
    }
  }

  async getLocationSuggestion(query: string): Promise<string> {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${this.MAPBOX_API_KEY}`;
      const response = await lastValueFrom(this.http.get<any>(url));
      return response.features[0]?.text || '';
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return '';
    }
  }
}
