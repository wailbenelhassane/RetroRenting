import { Injectable, OnDestroy, NgZone } from '@angular/core';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { FooterItem } from '../models/footer.model';

@Injectable({
  providedIn: 'root'
})
export class FooterService implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private firestore: Firestore,
    private ngZone: NgZone
  ) {}

  getFooterData(): Observable<FooterItem[]> {
    return new Observable<FooterItem[]>(observer => {
      this.ngZone.run(() => {
        const footerCollection = collection(this.firestore, 'footer');
        getDocs(footerCollection).then((querySnapshot: QuerySnapshot<DocumentData>) => {
          if (querySnapshot && !querySnapshot.empty) {
            const footerItems = querySnapshot.docs.map(doc => doc.data() as FooterItem);
            observer.next(footerItems);
            observer.complete();
          } else {
            console.warn('No footer data found in Firestore');
            observer.next([]);
            observer.complete();
          }
        }).catch((error: any) => {
          console.error('Error loading footer data from Firestore:', error);
          observer.next([]);
          observer.complete();
        });
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
