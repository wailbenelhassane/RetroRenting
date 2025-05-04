import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {doc, Firestore, getDoc} from '@angular/fire/firestore';
import {UserCredential} from '@angular/fire/auth';
import {AuthService} from './auth.service';
import {FormValidationService} from './utils/form-validation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private firestore: Firestore,
              private validationService: FormValidationService,
              private auth: AuthService) { }

  processLogin(loginForm: FormGroup): string[] {
    const errors = this.validationService.validate(loginForm.value, this.getLoginValidationSchema());

    if (errors.length === 0) {
      this.login(loginForm.value.username, loginForm.value.password);
    }
    return errors;
  }

  login(email: string, password: string): Promise<UserCredential> {
    return this.auth.login(email, password);
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

  private getLoginValidationSchema(): Record<string, string[]> {
    return {
      email: ['required', 'email'],
      password: ['required', 'password']
    };
  }
}
