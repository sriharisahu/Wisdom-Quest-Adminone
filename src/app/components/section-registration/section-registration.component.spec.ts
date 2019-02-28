import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRegistrationComponent } from './section-registration.component';

describe('SectionRegistrationComponent', () => {
  let component: SectionRegistrationComponent;
  let fixture: ComponentFixture<SectionRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
