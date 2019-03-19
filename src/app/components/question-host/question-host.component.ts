import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { ExamService } from 'src/app/service/exam.service';
import { QuestionRegistrationComponent } from '../question-registration/question-registration.component';

@Component({
  selector: 'app-question-host',
  templateUrl: './question-host.component.html',
  styleUrls: ['./question-host.component.scss']
})
export class QuestionHostComponent implements OnInit {
  @Input() public question: any;
  @Input() public index: any;
  @Input() isAttachable;
  @Input() isQuestionBank;
  @Input() section;
  label = ['A', 'B', 'C', 'D'];

  constructor(
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
    private examService: ExamService) { }

  ngOnInit() {
  }
  attach(question) {
    this.examService.questionToAttach = question;
  }

  edit(question): void {
    const configuartion = {
      initialState : {
        title: 'Question Registration Form',
        selectedQuestion: question,
        isQuestionBank: this.isQuestionBank,
        section: this.section
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(QuestionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        if (this.section) {

          request.examSectionVo = {
            examSectionId : this.section.examSectionId
          };
          this.examService.updateQuestion(request).subscribe(
            (response) => {
              this.bsModalService.hide(1);
            }
          );
        }
      }
    );
  }
  exaplanation() {}
}
