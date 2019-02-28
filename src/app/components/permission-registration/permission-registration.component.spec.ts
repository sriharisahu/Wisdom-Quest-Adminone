import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRegistrationComponent } from './permission-registration.component';

describe('PermissionRegistrationComponent', () => {
  let component: PermissionRegistrationComponent;
  let fixture: ComponentFixture<PermissionRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
