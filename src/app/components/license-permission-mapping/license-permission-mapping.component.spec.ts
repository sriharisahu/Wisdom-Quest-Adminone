import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensePermissionMappingComponent } from './license-permission-mapping.component';

describe('LicensePermissionMappingComponent', () => {
  let component: LicensePermissionMappingComponent;
  let fixture: ComponentFixture<LicensePermissionMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensePermissionMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensePermissionMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
