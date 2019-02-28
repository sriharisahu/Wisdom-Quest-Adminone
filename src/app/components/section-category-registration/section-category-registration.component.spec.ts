import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCategoryRegistrationComponent } from './section-category-registration.component';

describe('SectionCategoryRegistrationComponent', () => {
  let component: SectionCategoryRegistrationComponent;
  let fixture: ComponentFixture<SectionCategoryRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionCategoryRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionCategoryRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
