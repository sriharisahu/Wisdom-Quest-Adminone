import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFromCsvComponent } from './import-from-csv.component';

describe('ImportFromCsvComponent', () => {
  let component: ImportFromCsvComponent;
  let fixture: ComponentFixture<ImportFromCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportFromCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFromCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
