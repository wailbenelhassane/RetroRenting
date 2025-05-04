import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { BookingBarService, Car } from '../../services/booking-bar.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-booking-bar',
  templateUrl: './booking-bar.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./booking-bar.component.scss']
})
export class BookingBarComponent implements OnInit {
  bookingForm: FormGroup;
  cars: Car[] = [];
  formErrors: string[] = [];
  locationSuggestions: string[] = [];
  showSuggestions = false;

  constructor(
      private formBuilder: FormBuilder,
      protected bookingBarService: BookingBarService,
      @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.bookingForm = this.formBuilder.group({
      car: ['', Validators.required],
      location: ['', Validators.required],
      pickupDate: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCars();

    if (isPlatformBrowser(this.platformId)) {
      this.bookingForm.get('location')?.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged()
      ).subscribe(async value => {
        if (value && value.length > 2) {
          this.locationSuggestions = await this.bookingBarService.setupLocationAutocomplete(value);
          this.showSuggestions = this.locationSuggestions.length > 0;
        } else {
          this.locationSuggestions = [];
          this.showSuggestions = false;
        }
      });
    }
  }

  async loadCars(): Promise<void> {
    this.cars = await this.bookingBarService.getCars();
    await this.bookingBarService.populateCarSelect(this.cars, this.bookingForm);
  }

  onSuggestionSelect(suggestion: string): void {
    this.bookingForm.get('location')?.setValue(suggestion);
    this.locationSuggestions = [];
    this.showSuggestions = false;
  }

  onSubmit(): void {
    this.formErrors = this.bookingBarService.processForm(this.bookingForm, this.cars);

    this.formErrors.forEach(error => {
      const controlMap: Record<string, string> = {
        car: 'car',
        location: 'location',
        locationInvalid: 'location',
        pickupDate: 'pickupDate',
        pickupDatePast: 'pickupDate',
        returnDate: 'returnDate',
        returnDatePast: 'returnDate',
        returnBeforePickup: 'returnDate'
      };

      const controlName = controlMap[error];
      const control = this.bookingForm.get(controlName);
      if (control) {
        control.reset();
        control.markAsTouched();
        control.markAsDirty();
      }
    });

  }
}
