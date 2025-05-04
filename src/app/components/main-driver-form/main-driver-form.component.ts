import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { MainDriverFormService } from '../../services/main-driver-form.service';

@Component({
  selector: 'app-main-driver-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './main-driver-form.component.html',
  styleUrl: './main-driver-form.component.scss'
})
export class MainDriverFormComponent {
  formErrors: string[] = [];
  driverForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public mainDriverService: MainDriverFormService
  ) {
    this.driverForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      prefix: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.formErrors = this.mainDriverService.validateFields(this.driverForm.value);
  }
}
