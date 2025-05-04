import { Component, Input } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './register.component.html',
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
}
