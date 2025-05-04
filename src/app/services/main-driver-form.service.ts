import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MainDriverFormService {
  validateFields(form: any): string[] {
    const errors: string[] = [];

    if (!this.isValuePresent(form.name)) errors.push('name');
    else if (!this.isValidName(form.name)) errors.push('invalidName');

    if (!this.isValuePresent(form.surname)) errors.push('surname');
    else if (!this.isValidName(form.surname)) errors.push('invalidSurName');

    if (!this.isValuePresent(form.email)) errors.push('email');
    else if (!this.isValidEmail(form.email)) errors.push('invalidEmail');

    if (!this.isValuePresent(form.prefix)) errors.push('prefix');

    if (!this.isValuePresent(form.phone)) errors.push('phone');
    else if (!this.isValidPhone(form.phone)) errors.push('invalidPhone');

    if (!this.isValuePresent(form.country)) errors.push('country');

    return errors;
  }

  getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      name: 'Please enter your name.',
      surname: 'Please enter your surname.',
      email: 'Please enter your email.',
      prefix: 'Please select a country code.',
      phone: 'Please enter your phone number.',
      country: 'Please select your country.',
      invalidName: 'Wrong name format: must start with a capital letter and only letters.',
      invalidSurName: 'Wrong surname format: must start with a capital letter and only letters.',
      invalidEmail: 'Wrong email format, correct format: example@domain.com.',
      invalidPhone: 'Phone must be 10–15 digits, only numbers.'
    };
    return messages[code] || 'Unknown error';
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

  private isValidPhone(value: string): boolean {
    return /^\d{10,15}$/.test(value);
  }
}
