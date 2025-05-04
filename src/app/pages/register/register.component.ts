import { Component, Input, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { RegisterService } from '../../services/register.service';
import {doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {AuthService} from '../../services/auth.service';
import {LoginService} from '../../services/login.service';
import {FormValidationService} from '../../services/utils/form-validation.service';

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
export class RegisterComponent implements OnInit{
  formErrors: string[] = [];

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public registerService: RegisterService,
    public validationService: FormValidationService,
    private router: Router,
    private loginService: LoginService,
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
  logoUrl: string = '';
  asideImgUrl: string = '';

  async ngOnInit(): Promise<void> {
    this.loginService.loadImages().then(({ imgUrl, asideImgUrl }) => {
      this.logoUrl = imgUrl;
      this.asideImgUrl = asideImgUrl;
    });
  }

  async onSubmit(): Promise<void> {
    this.formErrors = await this.registerService.processForm(this.registerForm);
    if (this.formErrors.length == 0) {
      await this.router.navigate(['/']);
    }
  }

}
