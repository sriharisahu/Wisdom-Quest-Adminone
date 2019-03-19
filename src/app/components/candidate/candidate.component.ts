import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { CandidateRegistrationComponent } from '../candidate-registration/candidate-registration.component';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { LicenseCandidateMappingComponent } from 'src/app/license-candidate-mapping/license-candidate-mapping.component';
import { AuthenticationService } from 'src/app/service/authentecation.service';
import { CertificateComponent } from '../certificate/certificate.component';
import { ResultComponent } from '../result/result.component';
import { CandidateFilterComponent } from '../candidate-filter/candidate-filter.component';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private configurationService: ConfigurationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService
    ) { }

  toggle = false;
  loading = false;
  candidateList = [];
  licenseList = [];
  currentParams;
  listEnd = true;
  totalCount = 0;
  pageNo = 1;
  searchKey = '';

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
  search(searchKey): void {
console.log(searchKey);
this.searchKey = searchKey;
this.pageNo = 1;
this.get();

  }
  get(): void {
    if (this.pageNo === 1) {
      this.licenseList = [];
      this.candidateList = [];
    }

    this.loading = true;
    if (this.currentParams.licenseId) {
      const req = {
        pageNo: this.pageNo,
        pageSize: 10,
        testConductorLicenseId: this.currentParams.licenseId,
        searchKey: this.searchKey
        };

      this.userService.getLicenseCandidateList(req).subscribe(
        (response) => {
          this.loading = false;
          if (response['status'] === 'success') {
                  this.licenseList = [...this.licenseList, ...response['object']['testConductorHasTestCodeVoList']];
                  for (const license of this.licenseList) {
                    license.examVo.status = license.status;
                    license.userVo.exam = license.examVo;
                    this.candidateList.push(license.userVo);
                  }
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
        pageNo: this.pageNo,
        pageSize: 10,
        searchKey: this.searchKey,
        active: true};
      this.userService.getCandidateList(req).subscribe(
        (response) => {
          this.loading = false;
          if (response['status'] === 'success') {
            this.candidateList = [...this.candidateList, ...response['object']['userVoList']];
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

  showCertificate(req): void {
    const configuartion = {
      initialState : {
        examId: req.examId,
        candidateId: req.candidateId
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(CertificateComponent, configuartion);

  }

  showResult(req): void {
    const configuartion = {
      initialState : {
        examId: req.exam.examId,
        candidateId: req.userId
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ResultComponent, configuartion);

  }

  add(): void {
    if (this.currentParams.clientId && this.currentParams.licenseId) {
      const configuartion = {
        initialState : {
          title: 'Allocate Candidate'
        },
        class: 'modal-lg'
      };
      this.bsModalService.show(LicenseCandidateMappingComponent, configuartion)
      .content
      .submit$
      .subscribe(
        (request) => {
          request.testConductorLicenseId = Number(this.currentParams.licenseId);
          this.userService.allocateCandidate(request).subscribe(
            (response) => {
              this.licenseList = [];
              this.candidateList = [];
              this.pageNo = 1;
              this.get();
              this.bsModalService.hide(1);
            }
          );
        }
      );


    } else {
      const configuartion = {
        initialState : {
          title: 'Candidate Registration Form'
        },
        class: 'modal-lg'
      };
      this.bsModalService.show(CandidateRegistrationComponent, configuartion)
      .content
      .submit$
      .subscribe(
        (request) => {
          this.userService.createCandidate(request).subscribe(
            (response) => {
              this.licenseList = [];
              this.candidateList = [];
              this.pageNo = 1;
              this.get();
              this.bsModalService.hide(1);
            }
          );
        }
      );

    }
  }

  edit(selectedCandidate): void {
    const configuartion = {
      initialState : {
        title: 'Candidate Update Form',
        selectedCandidate: selectedCandidate
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(CandidateRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.userService.updateCandidate(request).subscribe(
          (response) => {
            this.licenseList = [];
            this.candidateList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }




  license(selectedCandidate): void {
    this.router.navigate(['/license'], { queryParams: { candidateId : selectedCandidate.userId}, queryParamsHandling: 'merge' });
  }

  delete(selectedCandidate): void {


    const configuartion = {
      initialState : {
        title: 'Delete Candidate'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedCandidate, active: false };
            this.userService.updateCandidate(request).subscribe(
              (response) => {
                if (response['status'] === 'success') {
                  this.totalCount -= 1;
                  selectedCandidate.active = false;
                  this.candidateList = this.candidateList.filter((candidate) => {
                    return candidate.active;
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
  }

  loadMore() {
    this.pageNo += 1;
    this.get();
  }


}
