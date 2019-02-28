import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSettingsComponent } from './exam-settings.component';

describe('ExamSettingsComponent', () => {
  let component: ExamSettingsComponent;
  let fixture: ComponentFixture<ExamSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
