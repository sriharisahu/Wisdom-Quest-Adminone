import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationRegistrationComponent } from './specialization-registration.component';

describe('SpecializationRegistrationComponent', () => {
  let component: SpecializationRegistrationComponent;
  let fixture: ComponentFixture<SpecializationRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecializationRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
