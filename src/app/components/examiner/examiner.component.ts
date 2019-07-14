import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ExaminerRegistrationComponent } from '../examiner-registration/examiner-registration.component';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.scss']
})
export class ExaminerComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private configurationService: ConfigurationService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  toggle = false;
  loading = false;
  examinerList = [];
  clientList = [];
  currentParams;
  listEnd = true;
  totalCount = 0;
  pageNo = 1;

  ngOnInit() {
    this.route.queryParams.pipe()
      .subscribe(params => {
        this.currentParams = params;
        this.get();
      });

  }
  toggleSideMenu(event) {
    this.toggle = !this.toggle;
  }
  get(): void {
    this.loading = true;
    if (this.currentParams.clientId) {
      const req = {
        pageNo: this.pageNo,
        pageSize: 10,
        testConductorId: Number(this.currentParams.clientId),
        };

      this.userService.getClientExaminerList(req).subscribe(
        (response) => {
          this.loading = false;
          if (response['status'] === 'success') {
            this.examinerList = [...this.examinerList, ...response['object']['testConductorVoList']];
            if (req.pageNo === 1) {
              this.totalCount = response['object']['count'];
            }
            if ((req.pageNo * req.pageSize) >= this.totalCount) {
               this.listEnd = true;
            } else {
              this.listEnd = false;
            }
    }
        }
      );

    } else {
    const req = {
      pageNo: 1,
      pageSize: 10,
      searchKey: '',
      active: true};
    this.userService.getExaminerList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.examinerList = [...this.examinerList, ...response['object']['testConductorVoList']];
          if (req.pageNo === 1) {
            this.totalCount = response['object']['count'];
          }
          if ((req.pageNo * req.pageSize) >= this.totalCount) {
             this.listEnd = true;
          } else {
            this.listEnd = false;
          }
  }
      }
    );
    }
  }
  delete(selectedExaminer): void {


    const configuartion = {
      initialState : {
        title: 'Delete Examiner'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedExaminer, active: false };
            this.userService.updateExaminer(request).subscribe(
              (response) => {
                if (response['status'] === 'success') {
                  this.totalCount -= 1;
                  selectedExaminer.active = false;
                  this.examinerList = this.examinerList.filter((examiner) => {
                    return examiner.active;
                });
                }
              }
            );
           }
           this.bsModalService.hide(1);
           this.renderer.removeClass(this.document.body, 'modal-open');
      }
    );
  }

  add(): void {
    const configuartion = {
      initialState : {
        title: 'Examiner Registration Form'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExaminerRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.userService.createExaminer(request).subscribe(
          (response) => {
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }

  edit(selectedExaminer): void {
    const configuartion = {
      initialState : {
        title: 'Examiner Update Form',
        selectedExaminer: selectedExaminer
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExaminerRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.userService.updateExaminer(request).subscribe(
          (response) => {
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }

  license(selectedExaminer): void {
    this.router.navigate(['/license'], { queryParams: { examinerId : selectedExaminer.testConductorId}, queryParamsHandling: 'merge' });
  }



  loadMore() {
    this.pageNo += 1;
    this.get();
  }

}
