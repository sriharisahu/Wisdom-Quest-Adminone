import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionRegistrationComponent } from './question-registration.component';

describe('QuestionRegistrationComponent', () => {
  let component: QuestionRegistrationComponent;
  let fixture: ComponentFixture<QuestionRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
