import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router: Router) {}

  processLogin(form: FormGroup): string[] {
    const errors = this.validateLoginFields(form.value);
    return errors.length > 0 ? errors : [];
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
      username: 'Username is required.',
      usernameInvalid: 'Wrong username format, correct format: minimum five characters.',
      password: 'Password is required.',
      passwordTooShort: 'Password must be at least 6 characters long.'
    };
    return messages[code] || 'Unknown error';
  }

  private isValuePresent(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  private isUsernameFormatValid(value: string): boolean {
    return value.length >= 5;
  }

  private isPasswordLengthValid(value: string): boolean {
    return value.length >= 6;
  }
}
