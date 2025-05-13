import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { FormValidationService } from '../../services/utils/form-validation.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    IonicModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logoUrl: string = 'test';
  asideImgUrl: string = 'test';
  formErrors: string[] = [];

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    public validationService: FormValidationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
    if (this.formErrors.length === 0) {
      this.router.navigate(['/']);
    }
  }
}
