import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseKeyComponent } from './license-key.component';

describe('LicenseKeyComponent', () => {
  let component: LicenseKeyComponent;
  let fixture: ComponentFixture<LicenseKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
