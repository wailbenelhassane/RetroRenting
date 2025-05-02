import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarReservationInformationComponent } from './car-reservation-information.component';

describe('CarReservationInformationComponent', () => {
  let component: CarReservationInformationComponent;
  let fixture: ComponentFixture<CarReservationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarReservationInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarReservationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
