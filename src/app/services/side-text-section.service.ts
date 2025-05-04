import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { SideTextData } from '../models/side-text-section.model';

@Injectable({
  providedIn: 'root'
})
export class SideTextSectionService implements OnDestroy {
  private sectionDataSubject = new BehaviorSubject<SideTextData>({});
  sectionData$ = this.sectionDataSubject.asObservable();
  private destroy$ = new Subject<void>();

  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) {
    this.loadData();
  }

  private loadData() {
    this.ngZone.run(() => {
      const sideTextCollection = collection(this.firestore, 'sideText');
      getDocs(sideTextCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot && !querySnapshot.empty) {
          const sideTextData = querySnapshot.docs[0].data() as SideTextData;
          this.sectionDataSubject.next(sideTextData);
        } else {
          console.warn('No side text data found in Firestore');
          this.sectionDataSubject.next({});
        }
      }).catch((error: any) => {
        console.error('Error loading side text data from Firestore:', error);
        this.sectionDataSubject.next({});
      });
    });
  }

  getSectionData(): Observable<SideTextData> {
    return this.sectionData$;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
