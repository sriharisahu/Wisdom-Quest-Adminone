import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCandidateMappingComponent } from './license-candidate-mapping.component';

describe('LicenseCandidateMappingComponent', () => {
  let component: LicenseCandidateMappingComponent;
  let fixture: ComponentFixture<LicenseCandidateMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCandidateMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCandidateMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
