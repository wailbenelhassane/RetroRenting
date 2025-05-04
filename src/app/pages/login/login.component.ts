import { Component, Input } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
  @Input() imageURL: string = 'assets/images/login.jpg';
  @Input() logoURL: string = 'assets/images/logo.png';
  formErrors: string[] = [];

  loginForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      public loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.formErrors = this.loginService.processLogin(this.loginForm);
  }
}
