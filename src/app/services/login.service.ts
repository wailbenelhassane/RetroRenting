import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {UserCredential} from '@angular/fire/auth';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private firestore: Firestore, private auth: AuthService) { }

  processLogin(form: FormGroup): string[] {
    const errors = this.validateLoginFields(form.value);

    if (errors.length === 0) {
      this.login(form.value.username, form.value.password);
    }
    return errors;
  }

  login(email: string, password: string): Promise<UserCredential> {
    return this.auth.login(email, password);
  }

  validateLoginFields(form: any): string[] {
    const errors: string[] = [];

    if (!this.isValuePresent(form.username)) {
      errors.push('username');
    } else if (!this.isUsernameFormatValid(form.username)) {
      errors.push('usernameInvalid');
    }

    if (!this.isValuePresent(form.password)) {
      errors.push('password');
    } else if (!this.isPasswordLengthValid(form.password)) {
      errors.push('passwordTooShort');
    }

    return errors;
  }

  getLoginErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      username: 'email is required.',
      usernameInvalid: 'Wrong email format, correct format: domain@domain.com.',
      password: 'Password is required.',
      passwordTooShort: 'Password must be at least 6 characters long.'
    };
    return messages[code] || 'Unknown error';
  }

  private isValuePresent(value: string): boolean {
    return value.trim().length > 0;
  }

  private isUsernameFormatValid(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  private isPasswordLengthValid(value: string): boolean {
    return value.length >= 6;
  }

  async loadImages(): Promise<{ imgUrl: string, asideImgUrl: string }> {
    const refLogo = doc(this.firestore, 'loginContent/iSjxwh8cCQzLXQFUda78');
    const refAside = doc(this.firestore, 'loginContent/glrZ1OoJyc0FIhFDkdSW');

    let imgUrl: string = '';
    let asideImgUrl: string = '';

    try {
      const docSnap = await getDoc(refLogo);
      if (docSnap.exists()) {
        const data = docSnap.data();
        imgUrl = data['src'] || null;
      } else {
        console.warn('Documento de logo no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener el logo:', error);
    }

    try {
      const docSnap = await getDoc(refAside);
      if (docSnap.exists()) {
        const data = docSnap.data();
        asideImgUrl = data['src'] || null;
      } else {
        console.warn('Documento de imagen lateral no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener la imagen lateral:', error);
    }

    return { imgUrl, asideImgUrl };
  }
}
