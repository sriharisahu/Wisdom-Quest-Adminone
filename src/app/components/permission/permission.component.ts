import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { PermissionRegistrationComponent } from '../permission-registration/permission-registration.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private configurationService: ConfigurationService) { }

  toggle = false;
  loading = false;
  permissionList = [];
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
      pageSize: 10,
      searchKey: '',
      active: true};
    this.configurationService.getPermissionList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.permissionList = [...this.permissionList, ...response['object']['permissionVoList']];
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
        title: 'Permission Registration Form'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(PermissionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.configurationService.createPermission(request).subscribe(
          (response) => {
            this.permissionList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }

  edit(selectedPermission): void {
    const configuartion = {
      initialState : {
        title: 'Permission Update Form',
        selectedPermission: selectedPermission
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(PermissionRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.configurationService.updatePermission(request).subscribe(
          (response) => {
            this.permissionList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }



  delete(selectedPermission): void {


    const configuartion = {
      initialState : {
        title: 'Delete Permission'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedPermission, active: false };
            this.configurationService.updatePermission(request).subscribe(
              (response) => {
                if (response['status'] === 'success') {
                  this.totalCount -= 1;
                  selectedPermission.active = false;
                  this.permissionList = this.permissionList.filter((permission) => {
                    return permission.active;
                });
                }
              }
            );
           }
           this.bsModalService.hide(1);
      }
    );
  }

  onScroll() {
    this.pageNo += 1;
    this.get();
  }

}
