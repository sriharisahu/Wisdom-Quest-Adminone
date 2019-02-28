import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { LicenseRegistrationComponent } from '../license-registration/license-registration.component';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { LicensePermissionMappingComponent } from '../license-permission-mapping/license-permission-mapping.component';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private configurationService: ConfigurationService) { }

  toggle = false;
  loading = false;
  licenseList = [];
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

    if (this.currentParams.candidateId) {
        const req = {
          pageNo: 1,
          pageSize: 10,
          candidateId: this.currentParams.candidateId,
          searchKey: '',
          };

        this.userService.getExternalLicenseList(req).subscribe(
          (response) => {
            this.loading = false;
            if (response['status'] === 'success') {
                    this.licenseList = [...this.licenseList, ...response['object']['testConductorLicenseVoList']];
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
      if (this.currentParams.examinerId) {
        const req = {
          pageNo: 1,
          pageSize: 10,
          testConductorId: this.currentParams.examinerId
          };

        this.userService.getExaminerLicenseList(req).subscribe(
          (response) => {
            this.loading = false;
            if (response['status'] === 'success') {
                    this.licenseList = response['object']['testConductorLicenseVoList'];
            }
          }
        );

      }
      if (this.currentParams.clientId && !this.currentParams.examinerId) {
        const req = {
          pageNo: 1,
          pageSize: 10,
          testConductorId: this.currentParams.clientId
          };

        this.userService.getClientLicenseList(req).subscribe(
          (response) => {
            this.loading = false;
            if (response['status'] === 'success') {
                    this.licenseList = response['object']['testConductorLicenseVoList'];
            }
          }
        );

      }
  }
  goBack() {
    this.location.back();
  }

  add(): void {
    const configuartion = {
      initialState : {
        title: 'License Registration Form'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(LicenseRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        request.active = true;
        request.examVo = {
          examId: request.examId
        };
        if (this.currentParams.clientId) {
          request.testConductorVo = {
            testConductorId: this.currentParams.clientId
          };
        }

        if (this.currentParams.examinerId) {
          request.testConductorVo = {
            testConductorId: this.currentParams.examinerId
          };
        }
        if (this.currentParams.candidateId) {
          request = {
            candidateId: Number(this.currentParams.candidateId),
            examId: request.examId
          };
          this.userService.createExatenalLicense(request).subscribe(
            (response) => {
              this.get();
              this.bsModalService.hide(1);
            }
          );

        } else {
          this.userService.createLicense(request).subscribe(
            (response) => {
              this.get();
              this.bsModalService.hide(1);
            }
          );

        }

      }
    );
  }

  edit(selectedLicense): void {
    const configuartion = {
      initialState : {
        title: 'License Update Form',
        selectedLicense: selectedLicense
      },
      class: 'modal-lg'
    };

    this.bsModalService.show(LicenseRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        request.active = true;
        request.examVo = {
          examId: request.examId
        };
        if (this.currentParams.clientId) {
          request.testConductorLicenseId = this.currentParams.clientId;
        }

        if (this.currentParams.examinerId) {
          request.testConductorLicenseId = this.currentParams.examinerId;
        }
        this.userService.updateLicense(request).subscribe(
          (response) => {
            this.licenseList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }


  delete(selectedLicense): void {


    const configuartion = {
      initialState : {
        title: 'Delete License'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedLicense, active: false };
             if (this.currentParams.clientId) {
              request.testConductorLicenseId = this.currentParams.clientId;
            }
            if (this.currentParams.examinerId) {
              request.testConductorLicenseId = this.currentParams.examinerId;
            }
            this.configurationService.updateLicense(request).subscribe(
              (response) => {
                if (response['status'] === 'success') {
                  this.totalCount -= 1;
                  selectedLicense.active = false;
                  this.licenseList = this.licenseList.filter((permission) => {
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
  candidate(selectedLicense): void {
  this.router.navigate(['/candidate'], {
     queryParams: { licenseId : selectedLicense.testConductorLicenseId,
                    remaininglicense : selectedLicense.remainingLicenseCount},
    queryParamsHandling: 'merge' });

  }
  examiner(selectedLicense): void {
    this.router.navigate(['/examiner'], {
       queryParams: { licenseId : selectedLicense.testConductorLicenseId,
        remaininglicense : selectedLicense.remainingLicenseCount},
        queryParamsHandling: 'merge' });

  }

  permission(selectedLicense) {

    const configuartion = {
      initialState : {
        title: 'License Permission Mapping'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(LicensePermissionMappingComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        if (this.currentParams.clientId) {
          request.userId = this.currentParams.clientId;
          request.userType = 'ADMIN';
        }
        if (this.currentParams.examinerId) {
          request.userId = this.currentParams.examinerId;
          request.userType = 'TESTCONDUCTOR';
        }
        if (this.currentParams.candidateId) {
          request.userId = this.currentParams.examinerId;
          request.userType = 'CANDIDATE';
        }
        request.examId = selectedLicense.examVo.examId;
            this.configurationService.mapLicensePermission(request).subscribe(
              (response) => {
                if (response['status'] === 'success') {
                }
              }
            );
           }
    );

  }

  onScroll() {
    console.log('scrolling...');
  }

}
