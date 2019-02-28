import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import {
  BsModalRef
} from 'ngx-bootstrap';
import {
  ExamService
} from 'src/app/service/exam.service';

@Component({
  selector: 'app-question-registration',
  templateUrl: './question-registration.component.html',
  styleUrls: ['./question-registration.component.scss']
})
export class QuestionRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  section;
  isQuestionBank = false;
  questionForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedQuestion: any;
  categoryList = [];
  subCategoryList = [];
  minTime: Date = new Date();
  maxTime: Date = new Date();
  PinitOption = {
    marks: null,
    optionName: '',
    optionType: false,
    optionValue: '',
    questionOptionId: null
  };
  optionRadio = ['A', 'B', 'C', 'D'];
  correct;
  get f() {
    return this.questionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // if (this.questionForm.invalid) {
    //   return;
    // }

    if (this.examService.questionToAttach) {
      const target = {
        examSectionVo: { examSectionId: this.section.examSectionId},
        questionNumber: this.questionForm.value.questionNumber,
        marks: this.questionForm.value.marks,
        negativeMarks: this.questionForm.value.negativeMarks,
        active: true,
        questionBankVo: {
          questionId:  this.examService.questionToAttach.questionBankVo.questionId
        }
          };
      const requestPayload = JSON.parse(JSON.stringify(target));
      this.submit$.emit(requestPayload);

    } else {
      const questionDescriptionVo = {
        descriptionText: this.questionForm.value.description,
        descriptionTextType: true,
        descriptionId: null
     };
     const options = [];
     this.questionForm.value.options.forEach((option, i) => {
      const o = {
        marks: null,
        optionName: this.optionRadio[i],
        optionType: false,
        optionValue: option,
        questionOptionId: null
      };
      options.push(o);
     });

     const explanation = {
      explanationText: this.questionForm.value.explanation,
      explanationTextType: true
     };
     const correctAnswer = this.questionForm.value.correct;
     const correctOption = options[this.optionRadio.indexOf(correctAnswer)];
     const questionCategoryVo = {
      questionCategoryId: this.questionForm.value.categoryId
     } ;
     let target;
     if (this.isQuestionBank) {
       target = {
        examSectionVo: { examSectionId: this.section.examSectionId},
        active: true,
        questionBankVo: {
          questionDescriptionVo: questionDescriptionVo,
          questionCategoryVo: questionCategoryVo,
          questionStatment: this.questionForm.value.statement,
          options: options,
          explanation: explanation,
          correctOption: correctOption,
          correctAnswer: correctAnswer
        }
          };

     } else {
       target = {
        examSectionVo: { examSectionId: this.section.examSectionId},
        questionNumber: this.questionForm.value.questionNumber,
        marks: this.questionForm.value.marks,
        negativeMarks: this.questionForm.value.negativeMarks,
        active: true,
        questionBankVo: {
          questionDescriptionVo: questionDescriptionVo,
          questionCategoryVo: questionCategoryVo,
          questionStatment: this.questionForm.value.statement,
          options: options,
          explanation: explanation,
          correctOption: correctOption,
          correctAnswer: correctAnswer
        }
          };

     }
      const requestPayload = JSON.parse(JSON.stringify(target));
      this.submit$.emit(requestPayload);

    }
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    public examService: ExamService) {

    this.minTime.setHours(0);
    this.minTime.setMinutes(0);
    this.maxTime.setHours(6);
    this.maxTime.setMinutes(0);
  }

  attach() {
    if (this.examService.questionToAttach) {
      const questionForm = {
        categoryId: [this.examService.questionToAttach.questionBankVo.questionCategoryVo.questionSubCategoryId, Validators.required],
        statement : [this.examService.questionToAttach.questionBankVo.questionStatment, Validators.required],
        description: ['', Validators.required],
        questionNumber: ['', Validators.required],
        marks: ['', Validators.required],
        options: this.formBuilder.array([
          this.formBuilder.control(this.examService.questionToAttach.questionBankVo.options[0].optionValue),
          this.formBuilder.control(this.examService.questionToAttach.questionBankVo.options[1].optionValue),
          this.formBuilder.control(this.examService.questionToAttach.questionBankVo.options[2].optionValue),
          this.formBuilder.control(this.examService.questionToAttach.questionBankVo.options[3].optionValue)
        ]),
        correct: [this.examService.questionToAttach.questionBankVo.correctOption.optionName],
        correctOption: [this.examService.questionToAttach.questionBankVo.correctOption],
        negativeMarks: [''],
        explanation: [''],
      };
      this.questionForm = this.formBuilder.group(questionForm);
  }
  }

  ngOnInit() {

    let questionForm = {};
    if (this.selectedQuestion) {
      if (this.isQuestionBank) {

        questionForm = {
          categoryId: [this.selectedQuestion.questionBankVo.questionCategoryVo.questionSubCategoryId, Validators.required],
          statement : [this.selectedQuestion.questionBankVo.questionStatment, Validators.required],
          description: ['', Validators.required],
          options: this.formBuilder.array([
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[0].optionValue),
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[1].optionValue),
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[2].optionValue),
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[3].optionValue)
          ]),
          correct: [this.selectedQuestion.questionBankVo.correctOption.optionName],
          correctOption: [this.selectedQuestion.questionBankVo.correctOption],
          explanation: [''],
        };


      } else {

        questionForm = {
          categoryId: [this.selectedQuestion.questionBankVo.questionCategoryVo.questionSubCategoryId, Validators.required],
          statement : [this.selectedQuestion.questionBankVo.questionStatment, Validators.required],
          description: ['', Validators.required],
          questionNumber: [this.selectedQuestion.questionNumber, Validators.required],
          marks: [this.selectedQuestion.marks, Validators.required],
          options: this.formBuilder.array([
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[0].optionValue),
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[1].optionValue),
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[2].optionValue),
            this.formBuilder.control(this.selectedQuestion.questionBankVo.options[3].optionValue)
          ]),
          correct: [this.selectedQuestion.questionBankVo.correctOption.optionName],
          correctOption: [this.selectedQuestion.questionBankVo.correctOption],
          negativeMarks: [''],
          explanation: [''],
        };
      }

      this.questionForm = this.formBuilder.group(questionForm);
    } else {

      questionForm = {
        categoryId: [''],
        statement : [''],
        description: [''],
        questionNumber: [''],
        marks: [''],
        options: this.formBuilder.array([
          this.formBuilder.control(''),
          this.formBuilder.control(''),
          this.formBuilder.control(''),
          this.formBuilder.control('')
        ]),
        correctOption: [''],
        negativeMarks: [''],
        explanation: [''],
        correct: ['']
      };
      this.questionForm = this.formBuilder.group(questionForm);

    }

    this.getCategoryList();
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  createOptions(o): FormGroup {
    return this.formBuilder.group(o);
  }

  getCategoryList() {
    const req = {
    questionCategoryId: this.section ? this.section.questionCategoryVo.questionCategoryId :
     this.selectedQuestion.examSectionVo ? this.selectedQuestion.examSectionVo.questionCategoryVo.questionCategoryId :
     this.selectedQuestion.questionBankVo.questionCategoryVo.questionCategoryId
    };
    this.examService.getQuestionCategoryList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.categoryList = response['list'];
        }
      }
    );
  }

}
