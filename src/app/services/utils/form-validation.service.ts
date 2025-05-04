import { Injectable } from '@angular/core';

type ValidatorFn = (value: any, form?: any) => boolean;

@Injectable({ providedIn: 'root' })
export class FormValidationService {
  private validators: Record<string, ValidatorFn> = {
    required: (value: any) => typeof value === 'string' && value.trim().length > 0,
    email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    name: (value: string) => /^[A-ZÁÉÍÓÚÑ][a-záéíóúñÁÉÍÓÚÑ]*(?: [A-ZÁÉÍÓÚÑ][a-záéíóúñÁÉÍÓÚÑ]*)*$/.test(value),
    phone: (value: string) => /^(\d\s?){9,15}$/.test(value.trim()),
    match: (value: string, form: any) => value === form?.password,
    username: (value: string) => value?.trim().length >= 5,
    password: (value: string) => /^(?=.*[A-Z]).{8,}$/.test(value),
    isDate: (value: string) => !!value && !isNaN(Date.parse(value)),
    location: (value: string) =>
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value?.trim()),
    notPast: (value: string) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    afterPickup: (value: string, form: any) => {
      const pickup = new Date(form?.pickupDate);
      const returnDate = new Date(value);

      if (isNaN(pickup.getTime()) || isNaN(returnDate.getTime())) return true;

      return returnDate > pickup;
    }

  };

  private messages: Record<string, string> = {
    name: 'Please enter your name.',
    location: 'Please enter your location.',
    surname: 'Please enter your surname.',
    email: 'Please enter your email.',
    username: 'Please enter your username.',
    password: 'Please enter your password',
    confirmPassword: 'Please enter your confirm password.',
    prefix: 'Please select a country code.',
    phone: 'Please enter your phone number.',
    country: 'Please select your country.',
    required: 'This field is required.',
    nameInvalid: 'Wrong name format: must start with a capital letter and only letters.',
    locationInvalid: 'Location cannot contain numbers or special characters.',
    surnameInvalid: 'Wrong name format: must start with a capital letter and only letters.',
    emailInvalid: 'Wrong email format, correct format: example@domain.com.',
    phoneInvalid: 'Phone must be 9–15 digits, only numbers.',
    passwordInvalid: 'Password must be at least 8 characters and contain a capital letter.',
    usernameInvalid: 'Username must have at least 5 characters.',
    confirmPasswordInvalid: 'Passwords do not match.',
    pickupDate: 'Please select a pickup date.',
    returnDate: 'Please select a return date.',
    pickupDateInvalid: 'Pickup date cannot be in the past.',
    returnDateInvalid: 'Return date cannot be in the past.',
    returnDateAfterpickupInvalid: 'Return date must be after pickup date.'
  };

  validate(form: any, schema: Record<string, string[]>): string[] {
    const errors: string[] = [];

    for (const field in schema) {
      const value = form[field];
      const rules = schema[field];

      for (const rule of rules) {
        const validator = this.validators[rule];
        if (validator && !validator(value, form)) {
          if (rule === 'afterPickup') {
            errors.push('returnDateAfterpickupInvalid');
          } else {
            const errorKey = `${field}${rule === 'required' ? '' : 'Invalid'}`;
            errors.push(errorKey);
            break;
          }
        }
      }
    }

    return errors;
  }

  getErrorMessage(code: string): string {
    return this.messages[code] || 'Unknown error';
  }
}
