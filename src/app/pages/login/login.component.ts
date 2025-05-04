import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private firestore: Firestore, private authService: AuthService, private router: Router) {}

  logoUrl: string = '';
  asideImgUrl: string = '';

  async ngOnInit(): Promise<void> {
    const ref = doc(this.firestore, 'loginContent/iSjxwh8cCQzLXQFUda78');

    try {
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.logoUrl = data['src'];
      } else {
        console.warn('Documento no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener el logo:', error);
    }
    const refAsideImg = doc(this.firestore, 'loginContent/glrZ1OoJyc0FIhFDkdSW');
    try {
      const docSnap = await getDoc(refAsideImg);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.asideImgUrl = data['src']
      } else {
        console.warn('Documento no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener imagen:', error);
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.errorMessage = '';
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.error('Login failed:', this.errorMessage);
        this.errorMessage = 'Invalid email or password';
      });
  }
}
