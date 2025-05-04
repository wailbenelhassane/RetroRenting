import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Auth, createUserWithEmailAndPassword, UserCredential} from '@angular/fire/auth';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {FormValidationService} from './utils/form-validation.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private auth: Auth,
              private firestore: Firestore,
              private validationService: FormValidationService) { }

  async processForm(registerForm: FormGroup): Promise<string[]> {
    const errors = this.validationService.validate(registerForm.value, this.getRegisterValidationSchema());

    if (errors.length === 0) {
      this.register(registerForm.value.email, registerForm.value.password).then(async userCredential => {
        const user = userCredential.user;

        try {
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

  private getRegisterValidationSchema(): Record<string, string[]> {
    return {
      name: ['required', 'name'],
      surname: ['required', 'name'],
      email: ['required', 'email'],
      username: ['required', 'username'],
      password: ['required', 'password'],
      confirmPassword: ['required', 'match']
    };
  }
}
