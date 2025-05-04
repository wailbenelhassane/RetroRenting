import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  processForm(registerForm: FormGroup): string[] {
    const errors = this.validateFields(registerForm.value);
    return errors.length > 0 ? errors : [];
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
