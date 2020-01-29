import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
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
import { ImportFromCsvComponent } from '../import-from-csv/import-from-csv.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
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
export class CandidateComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private configurationService: ConfigurationService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
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
  selectedExamVoList;

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

  toggleExamList = (candidate) => {
    if (this.selectedExamVoList === candidate.examVoList) {
      this.selectedExamVoList = null;

    } else {
      this.selectedExamVoList = candidate.examVoList;
    }
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
        testConductorLicenseId: Number(this.currentParams.licenseId),
        searchKey: this.searchKey
        };

      this.userService.getLicenseCandidateList(req).subscribe(
        (response) => {
          this.loading = false;
          if (response['status'] === 'success') {
                  this.licenseList = [...this.licenseList, ...response['object']['testConductorHasTestCodeVoList']];
                  for (const license of this.licenseList) {
                    license.candidateVo.examVoList = license.examVoList;
                    this.candidateList.push(license.candidateVo);
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
        candidateId: req.candidateId ? req.candidateId : req.userVo.userId,
        testConductorHasTestCodeId: req.testConductorHasTestCodeId
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(CertificateComponent, configuartion);

  }

  showResult(req): void {
    const configuartion = {
      initialState : {
        examId: req.examId,
        candidateId: req.candidateId ? req.candidateId : req.userVo.userId,
        testConductorHasTestCodeId: req.testConductorHasTestCodeId
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
          if (this.currentParams.clientId) {
            request.testConductorId = Number(this.currentParams.clientId);
          }
          this.userService.allocateCandidate(request).subscribe(
            (response) => {
              this.licenseList = [];
              this.candidateList = [];
              this.pageNo = 1;
              this.get();
              this.bsModalService.hide(1);
              this.renderer.removeClass(this.document.body, 'modal-open');
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
              this.renderer.removeClass(this.document.body, 'modal-open');
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
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }

  import = () => {
    const configuartion = {
      initialState : {
        title: 'Candidate Import',
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(ImportFromCsvComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.userService.createCandidateBulk(request).subscribe(
          (response) => {
            this.licenseList = [];
            this.candidateList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
            this.renderer.removeClass(this.document.body, 'modal-open');
          }
        );
      }
    );
  }




  license(selectedCandidate): void {
    this.router.navigate(['/license'], { queryParams: { candidateId : selectedCandidate.userId}, queryParamsHandling: 'merge' });
  }
  analysis(selectedCandidate): void {
    this.router.navigate(['/analysis'], { queryParams: { candidateId : selectedCandidate.userId}, queryParamsHandling: 'merge' });
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
           this.renderer.removeClass(this.document.body, 'modal-open');
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
