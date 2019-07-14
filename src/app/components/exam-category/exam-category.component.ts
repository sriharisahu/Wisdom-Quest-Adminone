import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ExamCategoryRegistrationComponent } from '../exam-category-registration/exam-category-registration.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-exam-category',
  templateUrl: './exam-category.component.html',
  styleUrls: ['./exam-category.component.scss'],
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
export class ExamCategoryComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private configurationService: ConfigurationService) { }

  toggle = false;
  loading = false;
  categoryList = [];
  subCategoryList = [];
  bsModalRef: BsModalRef;
  expandedCategory;
  totalCount = 0;
  totalSubCategoryCount = 0;
  pageNo = 1;
  listEnd = false;
  listSubCategoryEnd = false;

  ngOnInit() {
    this.get();

  }
  toggleCategory(category) {
    if (this.expandedCategory === category) {
      this.expandedCategory = null;

    } else {
      this.expandedCategory = category;
      this.getSubCategory(category);
    }
  }
  toggleSideMenu(event) {
    this.toggle = !this.toggle;
  }
  get(): void {
    this.loading = true;
    const req = {
      pageNo: this.pageNo,
      pageSize: 10,
      searchKey: '',
      active: true};
    this.configurationService.getExamCategoryList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.categoryList = [...this.categoryList, ...response['object']['examCategoryVoList']];
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
  getSubCategory(category): void {
    const req = {
      examCategoryId: category.examCategoryId ,
      active: true};
    this.configurationService.getExamSubCategoryList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.subCategoryList = response['list'];
              this.listSubCategoryEnd = true;
              this.totalSubCategoryCount = this.subCategoryList.length;
        }
      }
    );
  }

  add(): void {
    const configuartion = {
      initialState : {
        title: 'Exam Category Registration Form',
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExamCategoryRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        const requestPayload = {examCategoryName : request.categoryName};
        this.configurationService.createExamCategory(requestPayload).subscribe(
          (response) => {
            this.categoryList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }

  edit(selectedExamCategory): void {
    const configuartion = {
      initialState : {
        title: 'Exam Category Update Form',
        selectedExamCategory: selectedExamCategory,
        isCategory: true
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExamCategoryRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        const requestPayload = {
         examCategoryId: selectedExamCategory.examCategoryId,
         examCategoryName: request.categoryName
        };
        this.configurationService.updateExamCategory(requestPayload).subscribe(
          (response) => {
            this.categoryList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }


  addSubCategory(category): void {
    const configuartion = {
      initialState : {
        title: 'Exam Category Registration Form',
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExamCategoryRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        let requestPayload = {examSubCategoryName : request.categoryName};
        requestPayload = {...category, ...requestPayload };
        this.configurationService.createExamCategory(requestPayload).subscribe(
          (response) => {
            if (this.expandedCategory) {
              this.getSubCategory(this.expandedCategory);
            }
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }
  goBack() {

  }

  editSubCategory(selectedExamCategory): void {
    const configuartion = {
      initialState : {
        title: 'Exam Category Update Form',
        selectedExamCategory: selectedExamCategory,
        isCategory: false
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ExamCategoryRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        let requestPayload = {
         examSubCategoryId: selectedExamCategory.examSubCategoryId,
         examSubCategoryName: request.categoryName
        };
        requestPayload = {...selectedExamCategory , ...requestPayload };
        this.configurationService.updateExamCategory(requestPayload).subscribe(
          (response) => {
            if (this.expandedCategory) {
              this.getSubCategory(this.expandedCategory);
            }
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }



  delete(selectedCategory): void {


    const configuartion = {
      initialState : {
        title: 'Delete Confirmation'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedCategory, active: false };
            this.configurationService.updateExamCategory(request).subscribe(
              (response) => {
                if (response['status'] === 'success') {
                  selectedCategory.active = false;
                  if (selectedCategory.examSubCategoryId) {
                    this.subCategoryList = this.subCategoryList.filter((category) => {
                      return category.active;
                   });
                  } else {
                    this.totalCount -= this.totalCount;
                    this.categoryList = this.categoryList.filter((category) => {
                       return category.active;
                    });

                  }
                }
              }
            );
           }
           this.bsModalService.hide(1);
           this.renderer.removeClass(this.document.body, 'modal-open');
      }
    );
  }


  loadMore() {
    this.pageNo += 1;
    this.get();
  }

}
