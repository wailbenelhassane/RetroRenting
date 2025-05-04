import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Auth, createUserWithEmailAndPassword, UserCredential} from '@angular/fire/auth';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private auth: Auth,private router: Router,private firestore: Firestore) {
  }

  async processForm(registerForm: FormGroup): Promise<string[]> {
    const errors = this.validateFields(registerForm.value);
    if (errors.length === 0) {
      this.register(registerForm.value.email, registerForm.value.password).then(async userCredential => {
        const user = userCredential.user;

        try {
          console.log('UID:', user.uid);
          const userRef = doc(this.firestore, 'users', user.uid);
          await setDoc(userRef, {
            firstName: registerForm.value.name,
            lastName: registerForm.value.surname,
            username: registerForm.value.username,
            email: registerForm.value.email,
            createdAt: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error:', error);
        }
      })
        .catch(error => {
          console.error('Error al registrar:', error.message);
        });
    }

    return errors;
  }


  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  validateFields(form: any): string[] {
    const errors: string[] = [];

    if (!this.isValuePresent(form.name))
      errors.push('name');
    else if (!this.isValidName(form.name))
      errors.push('nameInvalid');

    if (!this.isValuePresent(form.surname))
      errors.push('surname');
    else if (!this.isValidName(form.surname))
      errors.push('surnameInvalid');

    if (!this.isValuePresent(form.email))
      errors.push('email');
    else if (!this.isValidEmail(form.email))
      errors.push('emailInvalid');

    if (!this.isValuePresent(form.username))
      errors.push('username');
    else if (!this.isValidUsername(form.username))
      errors.push('usernameInvalid');

    if (!this.isValuePresent(form.password))
      errors.push('password');
    else if (!this.isValidPassword(form.password))
      errors.push('passwordInvalid');

    if (!this.isValuePresent(form.confirmPassword))
      errors.push('password');
    else if (!this.doPasswordsMatch(form.password, form.confirmPassword))
      errors.push('confirmPasswordInvalid');

    return errors;
  }

  getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      name: 'Name is required.',
      surname: 'Surname is required.',
      email: 'Email is required.',
      username: 'Username is required.',
      password: 'Password is required.',
      confirmPassword: 'Confirm Passwords are required.',
      nameInvalid: 'Wrong name format: no numbers, must start with a capital letter, minimum 2 characters.',
      surnameInvalid: 'Wrong surname format: no numbers, must start with a capital letter, minimum 2 characters.',
      emailInvalid: 'Wrong email format: expected something like example@domain.com.',
      usernameInvalid: 'Wrong username format: minimum five characters.',
      passwordInvalid: 'Wrong password format: minimum 8 characters and at least one capital letter.',
      confirmPasswordInvalid: 'Passwords do not match.'
    };
    return messages[code] || 'Invalid field';
  }

  private isValuePresent(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }


  private isValidName(value: string): boolean {
    return /^[A-Z][a-zA-Z]{1,}$/.test(value?.trim());
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value?.trim());
  }

  private isValidUsername(value: string): boolean {
    return typeof value === 'string' && value.trim().length >= 5;
  }

  private isValidPassword(value: string): boolean {
    return /^(?=.*[A-Z]).{8,}$/.test(value);
  }

  private doPasswordsMatch(pass: string, confirm: string): boolean {
    return pass === confirm && !!confirm;
  }
}
