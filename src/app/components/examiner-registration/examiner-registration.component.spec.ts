import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerRegistrationComponent } from './examiner-registration.component';

describe('ExaminerRegistrationComponent', () => {
  let component: ExaminerRegistrationComponent;
  let fixture: ComponentFixture<ExaminerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExaminerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExaminerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
