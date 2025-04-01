import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { BookingBarService, Car } from '../../services/booking-bar.service';

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
  cars: Car[] = [];

  constructor(
    private formBuilder: FormBuilder,
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
    this.loadCars();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.bookingBarService.setupLocationAutocomplete(this.bookingForm);
    }
  }

  async loadCars(): Promise<void> {
    this.cars = await this.bookingBarService.getCars();
    await this.bookingBarService.populateCarSelect(this.cars, this.bookingForm);
  }

  onSubmit(): void {
    this.bookingBarService.processForm(this.bookingForm, this.cars);
  }
}
