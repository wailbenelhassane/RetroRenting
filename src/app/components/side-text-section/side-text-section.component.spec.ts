import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTextSectionComponent } from './side-text-section.component';

describe('SideTextSectionComponent', () => {
  let component: SideTextSectionComponent;
  let fixture: ComponentFixture<SideTextSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideTextSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideTextSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
