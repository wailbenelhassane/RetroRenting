import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { MainDriverFormService } from '../../services/main-driver-form.service';
import { Subscription } from 'rxjs';
import { Country } from '../../models/main-driver-form.model';
import {FormValidationService} from '../../services/utils/form-validation.service'; // Asegúrate de tenerlo

@Component({
  selector: 'app-main-driver-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './main-driver-form.component.html',
  styleUrl: './main-driver-form.component.scss'
})
export class MainDriverFormComponent implements OnInit, OnDestroy {
  formErrors: string[] = [];
  prefixes: string[] = [];
  countries: Country[] = [];
  driverForm: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public validationService: FormValidationService,
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

  ngOnInit(): void {
    this.loadPrefixes();
    this.loadCountries();
  }

  loadPrefixes(): void {
    this.subscription.add(
      this.mainDriverService.getCountryPrefixes().subscribe({
        next: (prefixes: string[]) => {
          this.prefixes = prefixes;
        },
        error: (error: any) => {
          console.error('Error loading prefixes:', error);
          this.prefixes = [];
        }
      })
    );
  }

  loadCountries(): void {
    this.subscription.add(
      this.mainDriverService.getAllCountries().subscribe({
        next: (countries: Country[]) => {
          this.countries = countries;
        },
        error: (error: any) => {
          console.error('Error loading countries:', error);
          this.countries = [];
        }
      })
    );
  }

  onSubmit(): void {
    this.formErrors = this.mainDriverService.proccessForm(this.driverForm);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
