import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  BsModalRef
} from 'ngx-bootstrap';
import {
  ExamService
} from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam-registration',
  templateUrl: './exam-registration.component.html',
  styleUrls: ['./exam-registration.component.scss']
})
export class ExamRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  examForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedExam: any;
  categoryList = [];
  subCategoryList = [];
  minTime: Date = new Date();
  maxTime: Date = new Date();
  get f() {
    return this.examForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.examForm.invalid) {
      return;
    }

    let requestPayload = JSON.parse(JSON.stringify(this.examForm.value));
    requestPayload.examCategoryVo = requestPayload.subCategory;
    const hh = new Date(requestPayload.duration).getHours();
    const mm = new Date(requestPayload.duration).getMinutes();
    requestPayload.durationInSeconds = (hh * 3600) + (mm * 60);
    const setting = {
      availableQuestionCount : 0,
      keywords: null,
      status: false,
      allowReattempts: false,
      reattemptsCount : 0,
      reattemptGap : 1,
      allowExamResume : true,
      allowResumeCount : 10,
      displayQuestion: 'one by one',
      allowBackButton : false,
      sectionNavigation : 'one by one',
      passingPercentage: 33,
      negativeMarking : 0,
      privacyType : 'public',
      startDate: new Date().getTime(),
      endDate: new Date().getTime()
    };
    requestPayload = {...setting, ...requestPayload};
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private examService: ExamService) {

    this.minTime.setHours(0);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(6);
    this.maxTime.setMinutes(0);
  }

  ngOnInit() {

    let examForm = {};
    if (this.selectedExam) {
      const d = new Date();
      const hh = Math.trunc(this.selectedExam.durationInSeconds / 3600);
      const mm = Math.trunc((this.selectedExam.durationInSeconds - hh) / 60);
      d.setHours(hh);
      d.setMinutes(mm);
      examForm = {
        examId : [this.selectedExam.examId, Validators.required],
        examName: [this.selectedExam.examName, Validators.required],
        category: ['', Validators.required],
        subCategory: ['', Validators.required],
        sectionCount: [this.selectedExam.sectionCount, Validators.required],
        questionCount: [this.selectedExam.questionCount, Validators.required],
        totalMarks: [this.selectedExam.totalMarks, Validators.required],
        duration: [d, Validators.required],
        examDescription: [atob(this.selectedExam.examDescriptionData), Validators.required],
        examInstructions: [atob(this.selectedExam.examInstructionsData), Validators.required],
      };
    } else {
      const d = new Date();
      d.setHours(0);
      d.setMinutes(30);

      examForm = {
        examName: ['', Validators.required],
        category: ['', Validators.required],
        subCategory: ['', Validators.required],
        sectionCount: ['', Validators.required],
        questionCount: ['', Validators.required],
        totalMarks: ['', Validators.required],
        duration: [d, Validators.required],
        examDescription: ['', Validators.required],
        examInstructions: ['', Validators.required],
      };
    }

    this.getCategoryList();
    this.examForm = this.formBuilder.group(examForm);
  }

  getCategoryList() {
    const req = {
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      active: true
    };
    this.examService.getCategoryList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.categoryList = response['object']['examCategoryVoList'];
          if (this.selectedExam) {
           this.examForm.patchValue({
               category: this.categoryList.filter((category) => {
                return category.examCategoryId === this.selectedExam.examCategoryVo.examCategoryId;
         })[0]
           });

           this.getSubCategoryList();
          }
        }
      }
    );
  }

  getSubCategoryList() {
    const category = this.examForm.value.category;
    if (!category.examCategoryId) {
      return;
    }
    const req = {
      examCategoryId: category.examCategoryId
    };
    this.examService.getSubCategoryList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.subCategoryList = response['list'];
          if (this.selectedExam) {
            this.examForm.patchValue({
                subCategory: this.subCategoryList.filter((subCategory) => {
                       return subCategory.examSubCategoryId === this.selectedExam.examCategoryVo.examSubCategoryId;
                })[0]
            });
           }
        }
      }
    );
  }
}
