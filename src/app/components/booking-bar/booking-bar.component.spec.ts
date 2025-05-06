import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBarComponent } from './booking-bar.component';

describe('BookingBarComponent', () => {
  let component: BookingBarComponent;
  let fixture: ComponentFixture<BookingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
