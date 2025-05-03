import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdChoicesComponent } from './ad-choices.component';

describe('AdChoicesComponent', () => {
  let component: AdChoicesComponent;
  let fixture: ComponentFixture<AdChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdChoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
