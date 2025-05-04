import {Injectable} from '@angular/core';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BarDetailsService {

  constructor(private firestore: Firestore) {}

  async getInfo(carId: string): Promise<any> {
    const carRef = doc(this.firestore, `catalogInfo/${carId}`);

    const docSnapshot = await getDoc(carRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return data?.['info'];
    } else {
      console.warn(`Id not found: ${carId}`);
      return null;
    }
  }
}
