import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit{
  logoUrl: string = '';
  asideImgUrl: string = '';
  formErrors: string[] = [];

  loginForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      public loginService: LoginService,
      private firestore: Firestore,
      private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

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

  onSubmit(): void {
    this.formErrors = this.loginService.processLogin(this.loginForm);
  }
}
