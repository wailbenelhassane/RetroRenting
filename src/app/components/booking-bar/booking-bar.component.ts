import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BookingBarService } from '../../services/booking-bar.service';

interface Car {
  value: string;
  name: string;
}

@Component({
  selector: 'app-booking-bar',
  templateUrl: './booking-bar.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./booking-bar.component.scss']
})
export class BookingBarComponent implements OnInit, AfterViewInit {
  bookingForm: FormGroup;
  errors: string[] = [];
  suggestions: string[] = [];
  cars: Car[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookingBarService: BookingBarService,
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
    this.populateCarSelect();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupLocationAutocomplete();
    }
  }

  async populateCarSelect(): Promise<void> {
    try {
      this.cars = await this.bookingBarService.getCars();

      if (this.cars.length > 0) {
        this.bookingForm.get('car')?.setValue(this.cars[0].value);

        // Only manipulate DOM in browser environment
        if (isPlatformBrowser(this.platformId)) {
          const carSelector = document.getElementById('car-selector') as HTMLSelectElement;
          if (carSelector) {
            this.cars.forEach(car => {
              const option = document.createElement('option');
              option.value = car.value;
              option.text = car.name;
              carSelector.appendChild(option);
            });
          }
        }
      }
    } catch (error) {
      console.error("Can't load cars data", error);
    }
  }

  setupLocationAutocomplete(): void {
    const locationInput = document.getElementById('location') as HTMLInputElement;
    const suggestionsBox = document.getElementById('suggestions-box') as HTMLDivElement;

    if (!locationInput || !suggestionsBox) return;

    locationInput.addEventListener('input', async (event) => {
      const query = (event.target as HTMLInputElement).value;
      if (query.length > 2) {
        try {
          const suggestion = await this.bookingBarService.getLocationSuggestion(query);
          this.suggestions = suggestion ? [suggestion] : [];
          suggestionsBox.innerHTML = '';

          this.suggestions.forEach(text => {
            const div = document.createElement('div');
            div.textContent = text;
            div.style.padding = '8px 10px';
            div.style.cursor = 'pointer';

            div.addEventListener('click', () => {
              locationInput.value = text;
              this.bookingForm.get('location')?.setValue(text);
              suggestionsBox.innerHTML = '';
              suggestionsBox.classList.remove('active');
            });

            div.addEventListener('mouseover', () => {
              div.style.backgroundColor = '#f0f0f0';
            });

            div.addEventListener('mouseout', () => {
              div.style.backgroundColor = 'white';
            });

            suggestionsBox.appendChild(div);
          });

          if (this.suggestions.length > 0) {
            suggestionsBox.classList.add('active');
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('active');
      }
    });

    document.addEventListener('click', (event) => {
      if (!locationInput.contains(event.target as Node) && !suggestionsBox.contains(event.target as Node)) {
        suggestionsBox.classList.remove('active');
      }
    });
  }

  onSubmit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cleanAllInputs();
    this.errors = this.validateAllFields();

    const errorSection = document.getElementById('error-section');
    if (errorSection) {
      errorSection.innerHTML = '';

      if (this.errors.length > 0) {
        const errorList = document.createElement('ul');
        errorList.className = 'error-list';

        this.errors.forEach(error => {
          const errorItem = document.createElement('li');
          errorItem.textContent = error;
          errorList.appendChild(errorItem);
        });

        errorSection.appendChild(errorList);
        return;
      }
    }

    this.processBooking();
  }

  cleanAllInputs(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const inputs = document.querySelectorAll('#booking-bar-form input, #booking-bar-form select');
    inputs.forEach(input => {
      (input as HTMLElement).style.borderColor = '';
    });
  }

  validateAllFields(): string[] {
    const errors: string[] = [];
    const form = this.bookingForm;

    if (!form.get('car')?.value) {
      errors.push('Please select a car');
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('car-selector')?.setAttribute('style', 'border-color: red');
      }
    }

    if (!form.get('location')?.value) {
      errors.push('Please enter a location');
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('location')?.setAttribute('style', 'border-color: red');
      }
    }

    if (!form.get('pickupDate')?.value) {
      errors.push('Please select a pickup date');
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('pickup-date')?.setAttribute('style', 'border-color: red');
      }
    }

    if (!form.get('returnDate')?.value) {
      errors.push('Please select a return date');
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('return-date')?.setAttribute('style', 'border-color: red');
      }
    }

    const pickupDate = new Date(form.get('pickupDate')?.value);
    const returnDate = new Date(form.get('returnDate')?.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (pickupDate < today) {
      errors.push('Pickup date cannot be in the past');
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('pickup-date')?.setAttribute('style', 'border-color: red');
      }
    }

    if (returnDate < pickupDate) {
      errors.push('Return date must be after pickup date');
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById('return-date')?.setAttribute('style', 'border-color: red');
      }
    }

    return errors;
  }

  processBooking(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    let carSelected = "No car selected";

    // Get the selected car name based on the form value
    const carValue = this.bookingForm.get('car')?.value;
    const selectedCar = this.cars.find(car => car.value === carValue);
    if (selectedCar) {
      carSelected = selectedCar.name;
    }

    const location = this.bookingForm.get('location')?.value;
    const pickupDate = this.bookingForm.get('pickupDate')?.value;
    const returnDate = this.bookingForm.get('returnDate')?.value;
    const formattedDate = `${pickupDate} - ${returnDate}`;

    const bookingData = {
      car: carSelected,
      location: location,
      formattedDate: formattedDate
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    this.router.navigate(['']);
  }
}
