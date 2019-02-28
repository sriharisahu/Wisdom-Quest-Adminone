import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseRegistrationComponent } from './license-registration.component';

describe('LicenseRegistrationComponent', () => {
  let component: LicenseRegistrationComponent;
  let fixture: ComponentFixture<LicenseRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
