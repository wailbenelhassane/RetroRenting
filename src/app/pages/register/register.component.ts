import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { FormValidationService } from '../../services/utils/form-validation.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf,
    IonicModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formErrors: string[] = [];
  registerForm: FormGroup;
  logoUrl: string = '';
  asideImgUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public registerService: RegisterService,
    public validationService: FormValidationService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  async ngOnInit(): Promise<void> {
    this.loginService.loadImages().then(({ imgUrl, asideImgUrl }) => {
      this.logoUrl = imgUrl;
      this.asideImgUrl = asideImgUrl;
    });
  }

  async onSubmit(): Promise<void> {
    this.formErrors = await this.registerService.processForm(this.registerForm);
    if (this.formErrors.length === 0) {
      await this.router.navigate(['/']);
    }
  }
}
