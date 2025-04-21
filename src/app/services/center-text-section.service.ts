import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { CenterTextData } from '../models/center-text-section-model';

@Injectable({
  providedIn: 'root'
})
export class CenterTextSectionService implements OnDestroy {
  private sectionDataSubject = new BehaviorSubject<CenterTextData>({});
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
      const centerTextCollection = collection(this.firestore, 'centerText');
      getDocs(centerTextCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot && !querySnapshot.empty) {
          const centerTextData = querySnapshot.docs[0].data() as CenterTextData;
          this.sectionDataSubject.next(centerTextData);
        } else {
          console.warn('No center text data found in Firestore');
          this.sectionDataSubject.next({});
        }
      }).catch((error: any) => {
        console.error('Error loading center text data from Firestore:', error);
        this.sectionDataSubject.next({});
      });
    });
  }

  getSectionData(): Observable<CenterTextData> {
    return this.sectionData$;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
