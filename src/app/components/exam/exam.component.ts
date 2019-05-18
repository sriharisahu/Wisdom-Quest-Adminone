import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ExamService } from 'src/app/service/exam.service';
import { ExamRegistrationComponent } from '../exam-registration/exam-registration.component';
import { ExamSettingsComponent } from '../exam-settings/exam-settings.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private examService: ExamService) { }

  toggle = false;
  loading = false;
  examList = [];
  listEnd = true;
  totalCount = 0;
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
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      active: true};
    this.examService.getExamList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.examList = [...this.examList, ...response['object']['examVoList']];
                // if (req.pageNo === 1) {
                //   this.totalCount = response['object']['count'];
                // }
                  this.totalCount = this.examList.length;
                if ((req.pageNo * req.pageSize) >= this.totalCount) {
                   this.listEnd = true;
                } else {
                  this.listEnd = false;
                }
        }
      }
    );
  }

  add(): void {
    const configuartion = {
      initialState : {
        title: 'Exam Registration Form'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExamRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.examService.createExam(request).subscribe(
          (response) => {
            this.examList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }

  edit(selectedExam): void {
    const configuartion = {
      initialState : {
        title: 'Exam Update Form',
        selectedExam: selectedExam
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExamRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.examService.updateExam(request).subscribe(
          (response) => {
            this.examList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }

  setting(selectedExam): void {
    const configuartion = {
      initialState : {
        title: 'Exam Settings Form',
        selectedExam: selectedExam
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExamSettingsComponent, configuartion)
    .content
    .submit
    .subscribe(
      () => {
        this.bsModalService.hide(1);
      }
    );
  }

  delete(selectedExam): void {}

  onScroll() {
    console.log('scrolling...');
  }

}
