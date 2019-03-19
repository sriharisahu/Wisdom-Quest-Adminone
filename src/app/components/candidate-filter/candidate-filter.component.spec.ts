import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFilterComponent } from './candidate-filter.component';

describe('CandidateFilterComponent', () => {
  let component: CandidateFilterComponent;
  let fixture: ComponentFixture<CandidateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
