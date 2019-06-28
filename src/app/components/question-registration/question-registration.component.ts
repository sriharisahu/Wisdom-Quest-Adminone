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
  isPsychometric = false;
  levelList = [ {levelName: 'HIGH'}, {levelName: 'LOW'}, {levelName: 'MEDIUM'} ];
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

  questionCategoryChange = (): void => {
    const questionSubCategory = this.categoryList.find((category) => {
     return this.questionForm.get('categoryId').value  === category.questionSubCategoryId;
    });
    if (questionSubCategory.questionSubCategoryName === 'Psychometric') {
      this.isPsychometric = true;
    } else {
      this.isPsychometric = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    }

    if (this.examService.questionToAttach) {
      const target = {
        questionNumber: this.questionForm.value.questionNumber,
        marks: this.questionForm.value.marks,
        negativeMarks: this.questionForm.value.negativeMarks,
        active: true,
        questionBankVo: {
          questionId: this.examService.questionToAttach.questionBankVo.questionId
          
        }
      };
      const requestPayload = JSON.parse(JSON.stringify(target));
      this.submit$.emit(requestPayload);

    } else {
      const questionDescriptionVo = {
        descriptionText: this.questionForm.value.description,
        description: this.questionForm.value.description,
        descriptionTextType: true,
        descriptionId: null
      };
      const options = [];
      this.questionForm.value.options.forEach((option, i) => {
        const o = {
          marks: null,
          optionName: this.optionRadio[i],
          optionType: false,
          optionValue: option
        };
        options.push(o);
      });

      if (this.isPsychometric) {
        this.questionForm.value.optionMarks.forEach((optionMarks, i) => {
          options[i].marks = optionMarks;
        });
       
      }

      const explanation = {
        explanationText: this.questionForm.value.explanation,
        explanationTextType: true
      };
      const correctAnswer = this.questionForm.value.correct;
      const correctOption = options[this.optionRadio.indexOf(correctAnswer)];
      const questionCategoryVo = {
        questionSubCategoryId: this.questionForm.value.categoryId
      };
      let target;
      if (this.isQuestionBank) {
        target = {
          active: true,
          questionBankVo: {
            questionDescriptionVo: questionDescriptionVo,
            questionCategoryVo: questionCategoryVo,
            questionStatment: this.questionForm.value.statement,
            options: options,
            explanation: explanation,
            correctOption: correctOption,
            correctAnswer: correctAnswer,
            level: this.questionForm.value.level
          }
        };

      } else {
        target = {
          examSectionVo: {
            examSectionId: this.section.examSectionId
          },
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
            correctAnswer: correctAnswer,
            level: this.questionForm.value.level
          }
        };
        if (this.selectedQuestion) {
          target.questionBankVo = {
            ...this.selectedQuestion.questionBankVo,
            ...target.questionBankVo
          };

          target.questionBankVo.questionStatmentData = null;
          if (target.questionBankVo.options) {
            target.questionBankVo.options.forEach((option, i) => {
              options['optionValueData'] = null;
              this.selectedQuestion.questionBankVo.options.forEach((o, j) => {
                options['optionValueData'] = null;
                if (o.optionName === option.optionName) {
                  option['questionOptionId'] = o.questionOptionId;
                }
              });
            });
          }

          target.examSectionHasQuestionId = this.selectedQuestion.examSectionHasQuestionId;
          if (target.questionBankVo.questionDescriptionVo) {
            target.questionBankVo.questionDescriptionVo.descriptionData = null;
            target.questionBankVo.questionDescriptionVo.descriptionTextData = null;
          }
          if (target.questionBankVo.explanation) {
            target.questionBankVo.explanation.explanationData = null;
            target.questionBankVo.explanation.explanationTextData = null;
          }
        }

      }
      if (this.isPsychometric) {
           target.marks = 0;
           target.sicoFlag = true;
           target.questionBankVo.correctAnswer = 'A';
      }
        target.negativeMarks = Number(target.negativeMarks);
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
        statement: [atob(this.examService.questionToAttach.questionBankVo.questionStatmentData), Validators.required],
        description: [''],
        questionNumber: ['', Validators.required],
        marks: [''],
        options: this.formBuilder.array([
          this.formBuilder.control(atob(this.examService.questionToAttach.questionBankVo.options[0].optionValueData)),
          this.formBuilder.control(atob(this.examService.questionToAttach.questionBankVo.options[1].optionValueData)),
          this.formBuilder.control(atob(this.examService.questionToAttach.questionBankVo.options[2].optionValueData)),
          this.formBuilder.control(atob(this.examService.questionToAttach.questionBankVo.options[3].optionValueData))
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
    debugger;
    if (this.selectedQuestion) {
      if (this.isQuestionBank) {

        questionForm = {
          examSectionHasQuestionId: [this.selectedQuestion.examSectionHasQuestionId],
          categoryId: [this.selectedQuestion.questionBankVo.questionCategoryVo.questionSubCategoryId, Validators.required],
          statement: [atob(this.selectedQuestion.questionBankVo.questionStatmentData), Validators.required],
          description: [''],
          level: [this.selectedQuestion.questionBankVo.level],
          options: this.formBuilder.array([
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[0].optionValueData)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[1].optionValueData)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[2].optionValueData)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[3].optionValueData))
          ]),
          optionMarks: this.formBuilder.array([
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[0].marks)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[1].marks)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[2].marks)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[3].marks))
          ]),
          correct: [this.selectedQuestion.questionBankVo.correctOption.optionName],
          correctOption: [this.selectedQuestion.questionBankVo.correctOption],
          explanation: [''],
        };


      } else {

        questionForm = {
          examSectionHasQuestionId: [this.selectedQuestion.examSectionHasQuestionId],
          categoryId: [this.selectedQuestion.questionBankVo.questionCategoryVo.questionSubCategoryId, Validators.required],
          statement: [atob(this.selectedQuestion.questionBankVo.questionStatmentData), Validators.required],
          description: [''],
          level: [this.selectedQuestion.questionBankVo.level],
          questionNumber: [this.selectedQuestion.questionNumber, Validators.required],
          marks: [this.selectedQuestion.marks],
          options: this.formBuilder.array([
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[0].optionValueData)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[1].optionValueData)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[2].optionValueData)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[3].optionValueData))
          ]),
          optionMarks: this.formBuilder.array([
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[0].marks)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[1].marks)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[2].marks)),
            this.formBuilder.control(atob(this.selectedQuestion.questionBankVo.options[3].marks))
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
        statement: [''],
        description: [''],
        level: [''],
        questionNumber: [''],
        marks: [''],
        options: this.formBuilder.array([
          this.formBuilder.control(''),
          this.formBuilder.control(''),
          this.formBuilder.control(''),
          this.formBuilder.control('')
        ]),
        optionMarks: this.formBuilder.array([
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
  get optionMarks() {
    return this.questionForm.get('optionMarks') as FormArray;
  }

  createOptions(o): FormGroup {
    return this.formBuilder.group(o);
  }

  getCategoryList() {
    const req = {
      questionCategoryId: this.section ?
      this.section.questionCategoryVo.questionCategoryId :
       this.selectedQuestion.examSectionVo ?
        this.selectedQuestion.examSectionVo.questionCategoryVo.questionCategoryId :
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
