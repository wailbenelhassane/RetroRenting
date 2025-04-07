import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterTextSectionComponent } from './center-text-section.component';

describe('CenterTextSectionComponent', () => {
  let component: CenterTextSectionComponent;
  let fixture: ComponentFixture<CenterTextSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterTextSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterTextSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
