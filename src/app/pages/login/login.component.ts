import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import {Router} from '@angular/router';
import {FormValidationService} from '../../services/utils/form-validation.service';


@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent implements OnInit{
  logoUrl: string = '';
  asideImgUrl: string = '';
  formErrors: string[] = [];

  loginForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      public loginService: LoginService,
      public validationService: FormValidationService,
      private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async ngOnInit(): Promise<void> {
    this.loginService.loadImages().then(({ imgUrl, asideImgUrl }) => {
      this.logoUrl = imgUrl;
      this.asideImgUrl = asideImgUrl;
    });
  }

  onSubmit(): void {
    this.formErrors = this.loginService.processLogin(this.loginForm);
    if (this.formErrors.length == 0) this.router.navigate(['/']);
  }
}
