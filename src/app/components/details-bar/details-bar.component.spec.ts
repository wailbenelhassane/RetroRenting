import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBarComponent } from './details-bar.component';

describe('DetailsBarComponent', () => {
  let component: DetailsBarComponent;
  let fixture: ComponentFixture<DetailsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
