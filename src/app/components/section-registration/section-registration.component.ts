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
import { ActivatedRoute } from '@angular/router';

const QUANTATIVE = 'Quantitative';

@Component({
  selector: 'app-section-registration',
  templateUrl: './section-registration.component.html',
  styleUrls: ['./section-registration.component.scss']
})
export class SectionRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  sectionForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedSection: any;
  categoryList = [];
  subCategoryList = [];
  minTime: Date = new Date();
  maxTime: Date = new Date();
  examId;
  isPsychometric = false;
  categoryTypeList = [{
    categoryTypeName: 'Aptitude'  // Quantitative
  },
  {categoryTypeName: 'Technical'},
  {categoryTypeName: 'Other'},
  {categoryTypeName: 'Reasoning'},
  {categoryTypeName: 'Psychometric'},
  {categoryTypeName: 'English'}
  ];
  get f() {
    return this.sectionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.sectionForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.sectionForm.value));
    requestPayload.questionCategoryVo = requestPayload.category;
    const hh = new Date(requestPayload.duration).getHours();
    const mm = new Date(requestPayload.duration).getMinutes();
    requestPayload.durationInSeconds = (hh * 3600) + (mm * 60);
    requestPayload.examVo = {
      examId: this.examId
    };
    requestPayload.sicoFlag = this.isPsychometric;
    requestPayload.sectionName = requestPayload.sectionName === 'Aptitude' ? QUANTATIVE : 'Technical';
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private examService: ExamService) {

    this.minTime.setHours(0);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(6);
    this.maxTime.setMinutes(0);
  }

  sectionCategoryChange = (): void => {
    const questionSubCategory = this.categoryList.find((category) => {
     return this.sectionForm.get('category').value.questionCategoryId  === category.questionCategoryId;
    });
    if (questionSubCategory.questionCategoryName === 'Psychometric') {
      this.isPsychometric = true;
    } else {
      this.isPsychometric = false;
    }
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      this.examId = data['params']['examId'];
    });

    let sectionForm = {};
    if (this.selectedSection) {
      const d = new Date();
      const hh = Math.trunc(this.selectedSection.durationInSeconds / 3600);
      const mm = Math.trunc((this.selectedSection.durationInSeconds - (hh * 3600)) / 60);
      d.setHours(hh);
      d.setMinutes(mm);
      sectionForm = {
        sectionName: [this.selectedSection.sectionName === QUANTATIVE ? 'Aptitude' : 'Technical', Validators.required],
        examId : [this.selectedSection.examVo.examId, Validators.required],
        examSectionId : [this.selectedSection.examSectionId, Validators.required],
        category: ['', Validators.required],
        sequence: [this.selectedSection.sequence, Validators.required],
        totalQuestion: [this.selectedSection.totalQuestion, Validators.required],
        totalMarks: [this.selectedSection.totalMarks, Validators.required],
        duration: [d, Validators.required],
      };
      if (this.selectedSection.examSectionDescriptionData) {
        sectionForm['examSectionDescription'] =  [atob(this.selectedSection.examSectionDescriptionData), Validators.required];
      } else {
        sectionForm['examSectionDescription'] = [''];
      }
      if (this.selectedSection.examSectionInstructionsData) {
        sectionForm['examSectionInstructions'] = [atob(this.selectedSection.examSectionInstructionsData), Validators.required];
      } else {
        sectionForm['examSectionInstructions'] = [''];
      }
    } else {
      const d = new Date();
      d.setHours(0);
      d.setMinutes(30);

      sectionForm = {
        sectionName: ['', Validators.required],
        category: ['', Validators.required],
        sequence: ['', Validators.required],
        totalQuestion: ['', Validators.required],
        totalMarks: ['', Validators.required],
        duration: [d, Validators.required],
        examSectionDescription: ['', Validators.required],
        examSectionInstructions: ['', Validators.required],
      };
    }

    this.getCategoryList();
    this.sectionForm = this.formBuilder.group(sectionForm);
  }

  getCategoryList() {
    const req = {
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      active: true
    };
    this.examService.getSectionCategoryList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.categoryList = response['object']['questionCategoryVoList'];
          if (this.selectedSection) {
           this.sectionForm.patchValue({
               category: this.categoryList.filter((category) => {
                return category.questionCategoryId === this.selectedSection.questionCategoryVo.questionCategoryId;
         })[0]
           });

          }
        }
      }
    );
  }

}
