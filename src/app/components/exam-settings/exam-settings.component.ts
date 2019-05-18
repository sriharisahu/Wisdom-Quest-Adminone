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
  examSettingForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedExam: any;
  selectedExamSetting: any;

  get f() {
    return this.examSettingForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.examSettingForm.invalid) {
          return;
    }
    this.submit.emit(this.examSettingForm.value);
  }
  constructor(private formBuilder: FormBuilder,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
 let examSettingForm = {};
    if (this.selectedExam) {
      examSettingForm = {
        publish: [''],
        allowReattempts: [],
        allowExamResume: [],
        allowBackButton: []
      };
    } else {
      examSettingForm = {
        publish: [''],
        allowReattempts: [],
        allowExamResume: [],
        allowBackButton: []
      };
    }
    this.examSettingForm = this.formBuilder.group(examSettingForm);
  }

}
