import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReservationConfirmationComponent } from './car-reservation-confirmation.component';

describe('CarReservationConfirmationComponent', () => {
  let component: CarReservationConfirmationComponent;
  let fixture: ComponentFixture<CarReservationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarReservationConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarReservationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
