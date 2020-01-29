import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { SectionRegistrationComponent } from '../section-registration/section-registration.component';
import { ExamService } from 'src/app/service/exam.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location, DOCUMENT } from '@angular/common';
import { QuestionRegistrationComponent } from '../question-registration/question-registration.component';


@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*', display: 'table-row' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ]
})
export class SectionComponent implements OnInit {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private bsModalService: BsModalService,
    private examService: ExamService) { }

  toggle = false;
  loading = false;
  sectionList = [];
  examId = null;
  expandedSection = null;
  questionList = [];
  subSectionList = [];

  toggleSection(section) {
    if (this.expandedSection === section) {
      this.expandedSection = null;
      this.questionList = [];

    } else {
      this.expandedSection = section;
      this.getQuestions();
      this.getSubSection();
    }
  }

  getSubSection() {
    const req = {
      examSectionId: this.expandedSection.examSectionId
    };
     this.examService.getSubSectionList(req).subscribe(
       (response) => {
         if (response['status'] === 'success') {
                 this.subSectionList = response['list'];
         }
       }
     );

  }

  getQuestions() {
    const req = {
      examSectionId: this.expandedSection.examSectionId,
      pageSize: 100,
      pageNo: 1
    };
     this.examService.getQuestionList(req).subscribe(
       (response) => {
         if (response['status'] === 'success') {
                 this.questionList = response['object']['examSectionHasQuestionVoList'];
         }
       }
     );

  }



  ngOnInit() {
    this.route.queryParamMap.subscribe(data => {
      this.examId = data['params']['examId'];
    });
    this.get(this.examId);

  }
  toggleSideMenu(event) {
    this.toggle = !this.toggle;
  }
  goBack() {
    this.location.back();
  }
  get(examId): void {
    const req = {
     examId: examId
    };
    this.examService.getSectionList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.sectionList = response['list'];
        }
      }
    );
  }

  addQuestion(section): void {
    const configuartion = {
      initialState : {
        title: 'Question Registration Form',
        section: section
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(QuestionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.examService.createQuestion(request).subscribe(
          (response) => {
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');

          }
        );
      }
    );
  }
  editQuestion(section): void {
    const configuartion = {
      initialState : {
        title: 'Question Registration Form',
        section: section
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(QuestionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.examService.createQuestion(request).subscribe(
          (response) => {
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');

          }
        );
      }
    );
  }

  add(): void {
    const configuartion = {
      initialState : {
        title: 'Section Registration Form'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(SectionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.examService.createSection(request).subscribe(
          (response) => {
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
            this.get(this.examId);
          }
        );
      }
    );
  }

  edit(selectedSection): void {
    const configuartion = {
      initialState : {
        title: 'Section Update Form',
        selectedSection: selectedSection
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(SectionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.examService.updateSection(request).subscribe(
          (response) => {
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
            this.get(this.examId);
          }
        );
      }
    );
  }

  setting(selectedSection): void {
    const configuartion = {
      initialState : {
        title: 'Section Settings Form',
        selectedExam: selectedSection
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(SectionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      () => {}
    );
  }

  delete(selectedSection): void {}

  onScroll() {
    console.log('scrolling...');
  }

}
