import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({ projectId: "panelon-fb7af", appId: "1:539993197273:web:bd60dd54cfcc9f2c38ccc8", storageBucket: "panelon-fb7af.firebasestorage.app", apiKey: "AIzaSyCQqzf1Ue3v0WtdWNQ9GkP-TTta4eoW8hI", authDomain: "panelon-fb7af.firebaseapp.com", messagingSenderId: "539993197273" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
