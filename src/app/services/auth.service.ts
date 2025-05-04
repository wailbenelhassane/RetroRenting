import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private firestore: Firestore, private auth: Auth) {
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          this.currentUserSubject.next(userDoc.data());
        } else {
          console.warn('Usuario no encontrado en Firestore');
        }
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

}
