import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; // Importa getDoc para obtener un solo documento

@Injectable({
  providedIn: 'root'
})
export class BarDetailsService {

  constructor(private firestore: Firestore) {}

  async getInfo(carId: string): Promise<any> {
    // Crear una referencia al documento de 'catalogInfo' usando el carId
    const carRef = doc(this.firestore, `catalogInfo/${carId}`);

    // Obtener el documento
    const docSnapshot = await getDoc(carRef);

    if (docSnapshot.exists()) {
      // Si el documento existe, obtenemos el campo 'info'
      const data = docSnapshot.data();
      return data?.['info']; // Retornamos el campo 'info' directamente
    } else {
      console.warn(`No se encontró el documento con ID: ${carId}`);
      return null;  // Retornamos null si no se encuentra el documento
    }
  }
}
