import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBookingBarComponent } from './process-booking-bar.component';

describe('ProcessBookingBarComponent', () => {
  let component: ProcessBookingBarComponent;
  let fixture: ComponentFixture<ProcessBookingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessBookingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessBookingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
