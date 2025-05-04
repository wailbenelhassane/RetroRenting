import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import {doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() imageURL: string = 'assets/images/login.jpg';
  @Input() logoURL: string = 'assets/images/logo.png';
  formErrors: string[] = [];

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public registerService: RegisterService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.formErrors = this.registerService.processForm(this.registerForm);
  }
  /**
export class RegisterComponent implements OnInit {
  constructor(private firestore: Firestore,private authService: AuthService, private router: Router) {}
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  confirmPassword: string = '';
  logoUrl: string = '';
  asideImgUrl: string = '';
  email: string = '';
  password: string = '';
  async ngOnInit(): Promise<void> {
    const ref = doc(this.firestore, 'loginContent/iSjxwh8cCQzLXQFUda78');

    try {
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.logoUrl = data['src'];
      } else {
        console.warn('Doc not found.');
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
        console.warn('Doc not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(async userCredential => {
        const user = userCredential.user;

        try {
          const userRef = doc(this.firestore, 'users', user.uid);
          await setDoc(userRef, {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
            createdAt: new Date().toISOString()
          });
          this.router.navigate(['/']);
        } catch (error) {
          console.error('Error:', error);
        }
      })
      .catch(error => {
        console.error('Error al registrar:', error.message);
      });
  }
**/
}
