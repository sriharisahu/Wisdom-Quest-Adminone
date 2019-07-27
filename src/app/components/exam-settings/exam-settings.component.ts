import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ExamService } from 'src/app/service/exam.service';

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
  displayQuestionFormats = [
    {
      value: 'A',
      displayName: 'ONE BY ONE'
    }
  ];

  get f() {
    return this.examSettingForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.examSettingForm.invalid) {
          return;
    }
    this.updateExamSettings();
  }
  constructor(private formBuilder: FormBuilder,
              private examService: ExamService,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.loading = true;
    let examSettingForm = {};
    if (this.selectedExam.examSettingsVo) {
      examSettingForm = {
        allowReattempts: [this.selectedExam.examSettingsVo.allowReattempts],
        reattemptCount: [this.selectedExam.examSettingsVo.reattemptCount],
        allowExamResume: [this.selectedExam.examSettingsVo.allowExamResume],
        allowExamResumeCount: [this.selectedExam.examSettingsVo.allowExamResumeCount],
        allowBackButton: [this.selectedExam.examSettingsVo.allowBackButton],
        privacy: true,
        active: [this.selectedExam.examSettingsVo.active],
        displayQuestion: [this.selectedExam.examSettingsVo.displayQuestion]
      };
    }
    this.examSettingForm = this.formBuilder.group(examSettingForm);
    this.loading = false;
  }

  updateExamSettings() {
    const req = this.examSettingForm.value;
    req.examSettingId = this.selectedExam.examSettingsVo.examSettingId;
    this.examService.updateExamSettings(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.submit.emit(this.examSettingForm.value);
        }
      }
    );
  }

}
