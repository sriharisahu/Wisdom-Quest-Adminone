import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ExamService } from 'src/app/service/exam.service';
import { ExamRegistrationComponent } from '../exam-registration/exam-registration.component';
import { ExamSettingsComponent } from '../exam-settings/exam-settings.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
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
      pageNo: this.pageNo,
      pageSize: 100,
      searchKey: '',
      active: true};
    this.examService.getExamList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.examList = [...this.examList, ...response['object']['examVoList']];
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
            this.renderer.removeClass(this.document.body, 'modal-open');
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
            this.renderer.removeClass(this.document.body, 'modal-open');
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
        this.renderer.removeClass(this.document.body, 'modal-open');
        this.get();
      }
    );
  }

  delete(selectedExam): void {
    selectedExam.active = false;
    this.examService.updateExam(selectedExam).subscribe(
      (response) => {
        this.examList = [];
        this.pageNo = 1;
        this.get();
      }
    );
  }
  publish(selectedExam): void {
    this.examService.publish(selectedExam.examId).subscribe(
      (response) => {
        selectedExam.publish = true;
      }
    );
  }
  unpublish(selectedExam): void {
    this.examService.unpublish(selectedExam).subscribe(
      (response) => {
        selectedExam.publish = false;
      }
    );
  }

  loadMore() {
    this.pageNo += 1;
    this.get();
  }
}
