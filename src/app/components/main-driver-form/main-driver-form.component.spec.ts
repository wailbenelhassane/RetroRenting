import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDriverFormComponent } from './main-driver-form.component';

describe('MainDriverFormComponent', () => {
  let component: MainDriverFormComponent;
  let fixture: ComponentFixture<MainDriverFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDriverFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDriverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
