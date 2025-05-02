import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "retrorenting-acd8d.firebaseapp.com",
  databaseURL: "https://retrorenting-acd8d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "retrorenting-acd8d",
  storageBucket: "retrorenting-acd8d.firebasestorage.app",
  messagingSenderId: "144755494629",
  appId: "1:144755494629:web:4cf9bf2246eeabbfd8ce0c"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
