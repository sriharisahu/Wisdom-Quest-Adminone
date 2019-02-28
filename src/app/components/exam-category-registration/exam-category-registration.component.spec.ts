import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCategoryRegistrationComponent } from './exam-category-registration.component';

describe('ExamCategoryRegistrationComponent', () => {
  let component: ExamCategoryRegistrationComponent;
  let fixture: ComponentFixture<ExamCategoryRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamCategoryRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCategoryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
