import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCarDetailsBookingComponent } from './bar-car-details-booking.component';

describe('BarCarDetailsBookingComponent', () => {
  let component: BarCarDetailsBookingComponent;
  let fixture: ComponentFixture<BarCarDetailsBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarCarDetailsBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarCarDetailsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
