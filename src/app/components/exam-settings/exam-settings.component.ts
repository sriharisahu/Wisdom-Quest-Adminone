import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-exam-settings',
  templateUrl: './exam-settings.component.html',
  styleUrls: ['./exam-settings.component.scss']
})
export class ExamSettingsComponent implements OnInit {


  @Output() submit = new EventEmitter<any>();
  examForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedExam: any;

  get f() {
    return this.examForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.examForm.invalid) {
          return;
    }
    this.submit.emit(this.examForm.value);
  }
  constructor(private formBuilder: FormBuilder,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    let examForm = {};
    if (this.selectedExam) {
      examForm = {
        examName: [this.selectedExam.examName, Validators.required]
      };
    } else {
      examForm = {
        examName: ['', Validators.required]
      };
    }
    this.examForm = this.formBuilder.group(examForm);
  }

}
