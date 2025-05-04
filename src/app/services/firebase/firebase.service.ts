import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore, runTransaction, setDoc,
  updateDoc
} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class FirebaseService<T extends { id?: string }> {
  private collectionName: string;
  firestore;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
    this.firestore = inject(Firestore)
  }

  getAll() {
    const colRef = collection(this.firestore, this.collectionName);
    return collectionData(colRef, { idField: 'id' }) as Observable<T[]>;
  }

  get(id: string){
    const docRef = doc(this.firestore, `${this.collectionName}/${id}}`);
    return docData(docRef, { idField: 'id' }) as Observable<T>;
  }

  add(data: T) {
    const colRef = collection(this.firestore, this.collectionName);
    return from(addDoc(colRef, data));
  }

  async getCounterId(): Promise<string> {
    const counterRef = doc(this.firestore, `counters/${this.collectionName}`);

    return await runTransaction(this.firestore, async (transaction) => {
      const counterSnap = await transaction.get(counterRef);

      let current = 0;
      if (counterSnap.exists()) {
        current = counterSnap.data()['current'];
      }

      const nextNumber = current + 1;
      const newId = `${this.collectionName.slice(0, -1)}_${nextNumber}`;

      transaction.set(counterRef, { current: nextNumber }, { merge: true });

      return newId;
    });
  }

  delete(id: string) {
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(deleteDoc(docRef));
  }

  update(data: T) {
    const { id, ...rest } = data;
    const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
    return from(updateDoc(docRef, rest));
  }
}
