import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHostComponent } from './question-host.component';

describe('QuestionHostComponent', () => {
  let component: QuestionHostComponent;
  let fixture: ComponentFixture<QuestionHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
