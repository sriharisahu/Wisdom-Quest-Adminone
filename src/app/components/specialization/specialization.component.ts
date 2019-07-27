import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { SpecializationRegistrationComponent } from '../specialization-registration/specialization-registration.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private configurationService: ConfigurationService) { }

  toggle = false;
  loading = false;
  specializationList = [];
  listEnd = true;
  totalCount = 0;
  pageNo = 1;
  searchKey = '';
  pageSize = 10;

  ngOnInit() {
    this.get();
  }
  search(searchKey): void {
    this.searchKey = searchKey;
    this.pageNo = 1;
    this.loading = true;
    this.get();
  }
  toggleSideMenu(event) {
    this.toggle = !this.toggle;
  }
  get(): void {
    this.loading = true;
    const req = {
      pageNo: this.pageNo,
      pageSize: this.pageSize,
      searchKey: this.searchKey,
      active: true};
    this.configurationService.getSpecializationList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                if (req.pageNo === 1) {
                  this.specializationList = [...response['object']['specializationVoList']];
                  this.totalCount = response['object']['count'];
                } else {
                  this.specializationList = [...this.specializationList, ...response['object']['specializationVoList']];
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

  add(): void {
    const configuartion = {
      initialState : {
        title: 'Specialization Registration Form'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(SpecializationRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.configurationService.createSpecialization(request).subscribe(
          (response) => {
            this.get();
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }

  edit(selectedSpecialization): void {
    const configuartion = {
      initialState : {
        title: 'Specialization Update Form',
        selectedSpecialization: selectedSpecialization
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(SpecializationRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.configurationService.updateSpecialization(request).subscribe(
          (response) => {
            this.get();
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }



  delete(selectedSpecialization): void {


    const configuartion = {
      initialState : {
        title: 'Delete Specialization'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedSpecialization, active: false };
            this.configurationService.updateSpecialization(request).subscribe(
              (response) => {
                this.get();
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
