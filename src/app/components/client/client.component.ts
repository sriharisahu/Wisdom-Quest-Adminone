import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ClientRegistrationComponent } from '../client-registration/client-registration.component';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private configurationService: ConfigurationService,
    private router: Router,
    private userService: UserService) { }

  toggle = false;
  loading = false;
  clientList = [];
  collegeList = [];
  currentParams;
  listEnd = true;
  totalCount = 0;
  pageNo = 1;

  ngOnInit() {
    this.get();
    this.getCollege();

  }
  toggleSideMenu(event) {
    this.toggle = !this.toggle;
  }

  examiner(selectedClient): void {
    this.router.navigate(['/examiner'], {
       queryParams: { clientId : selectedClient.testConductorId},
        queryParamsHandling: 'merge' });

  }
  getCollege(): void {
    const req = {
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      active: true};
    this.configurationService.getCollegeList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.collegeList = response['object']['collegeVoList'];
        }
      }
    );
  }
  get(): void {
    this.loading = true;
    const req = {
      pageNo: this.pageNo,
      pageSize: 10,
      searchKey: '',
      active: true};
    this.userService.getClientList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.clientList = [...this.clientList, ...response['object']['testConductorVoList']];
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

  add(): void {
    const configuartion = {
      initialState : {
        title: 'Client Registration Form',
        collegeList: this.collegeList
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ClientRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.userService.createClient(request).subscribe(
          (response) => {
            if (response['status'] === 'success') {
              this.clientList = [];
              this.pageNo = 1;
                this.get();
            }
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }

  edit(selectedClient): void {
    const configuartion = {
      initialState : {
        title: 'Client Update Form',
        selectedClient: selectedClient,
        collegeList: this.collegeList
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ClientRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.userService.updateClient(request).subscribe(
          (response) => {
            if (response['status'] === 'success') {
              this.clientList = [];
              this.pageNo = 1;
              this.get();
          }
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }

  license(selectedClient): void {
    this.router.navigate(['/license'], { queryParams: { clientId : selectedClient.testConductorId}, queryParamsHandling: 'merge' });
  }



  delete(selectedClient): void {


    const configuartion = {
      initialState : {
        title: 'Delete Client'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedClient, active: false };
            this.userService.updateExaminer(request).subscribe(
              (response) => {
                if (response['status'] === 'success') {
                  this.totalCount -= 1;
                  selectedClient.active = false;
                  this.clientList = this.clientList.filter((client) => {
                    return client.active;
                });
                }
              }
            );
           }
           this.bsModalService.hide(1);
      }
    );
  }

  loadMore() {
    this.pageNo += 1;
    this.get();
  }

}
