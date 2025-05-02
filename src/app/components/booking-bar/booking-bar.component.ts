import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {isPlatformBrowser, NgForOf} from '@angular/common';
import { BookingBarService } from '../../services/booking-bar.service';
import { Car } from '../../models/booking-bar.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-bar',
  templateUrl: './booking-bar.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  styleUrls: ['./booking-bar.component.scss']
})
export class BookingBarComponent implements OnInit, AfterViewInit, OnDestroy {
  bookingForm: FormGroup;
  cars: Car[] = [];
  private subscription: Subscription = new Subscription();

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadCars(): void {
    this.subscription.add(
      this.bookingBarService.getCars().subscribe({
        next: (cars: Car[]) => {
          this.cars = cars;
          this.bookingBarService.populateCarSelect(cars, this.bookingForm);
        },
        error: (error: any) => {
          console.error('Error loading cars:', error);
          this.cars = [];
        }
      })
    );
  }

  onSubmit(): void {
    this.bookingBarService.processForm(this.bookingForm, this.cars);
  }
}
