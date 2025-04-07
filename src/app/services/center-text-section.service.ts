import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CenterTextSectionService {
  private jsonUrl = '/data/centerText.json';
  private sectionDataSubject = new BehaviorSubject<{ [key: string]: { title: string, content: string } }>({});
  sectionData$ = this.sectionDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadData();
  }

  private getData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(
      catchError(error => {
        console.error("Error loading center text section data:", error);
        return throwError(error);
      })
    );
  }

  private loadData() {
    this.getData().subscribe({
      next: (data) => {
        if (data && data.sections) {
          this.sectionDataSubject.next(data.sections);
        } else {
          console.error("No sections found in the JSON data");
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getSectionData(): Observable<{ [key: string]: { title: string, content: string } }> {
    return this.sectionData$;
  }
}
