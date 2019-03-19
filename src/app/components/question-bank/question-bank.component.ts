import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ExamService } from 'src/app/service/exam.service';
import { QuestionRegistrationComponent } from '../question-registration/question-registration.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private examService: ExamService,
    private configurationService: ConfigurationService) { }

  toggle = false;
  loading = false;
  questionBankList = [];
  questionBankListTemp = [];
  listEnd = true;
  totalCount = 0 ;
  pageNo = 1;

  ngOnInit() {
    this.get();
  }
  toggleSideMenu(event) {
    this.toggle = !this.toggle;
  }
  get(): void {
    this.loading = true;
    const req = {
      pageNo: this.pageNo,
      pageSize: 30,
      active: true};
    this.examService.getQuestionBankList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.questionBankListTemp = [...this.questionBankListTemp, ...response['object']['questionBankVoList']];
          if (req.pageNo === 1) {
            this.totalCount = response['object']['count'];
          }
          if ((req.pageNo * req.pageSize) >= this.totalCount) {
             this.listEnd = true;
          } else {
            this.listEnd = false;
          }
          this.questionBankList = this.questionBankListTemp.map((qb) => {
            return  {questionBankVo: qb };
      });
  }
      }
    );
  }

  add(): void {
    const configuartion = {
      initialState : {
        title: 'College Registration Form'
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
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }

  edit(selectedCollege): void {
    const configuartion = {
      initialState : {
        title: 'College Update Form',
        selectedCollege: selectedCollege
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(QuestionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.examService.updateQuestion(request).subscribe(
          (response) => {
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }



  delete(selectedCollege): void {


    const configuartion = {
      initialState : {
        title: 'Delete College'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedCollege, active: false };
            this.configurationService.updateCollege(request).subscribe(
              (response) => {
                this.get();
              }
            );
           }
           this.bsModalService.hide(1);
      }
    );
  }

  onScroll() {
    // this.pageNo += 1;
    // this.get();
  }
  loadMore() {
    this.pageNo += 1;
    this.get();
  }
}
