import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { CandidateRegistrationComponent } from '../candidate-registration/candidate-registration.component';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

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
    ) { }

  toggle = false;
  loading = false;
  candidateList = [];
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
    if (this.currentParams.licenseId) {
      const req = {
        pageNo: this.pageNo,
        pageSize: 10,
        testConductorLicenseId: this.currentParams.licenseId,
        };

      this.userService.getLicenseCandidateList(req).subscribe(
        (response) => {
          this.loading = false;
          if (response['status'] === 'success') {
                  this.licenseList = [...this.licenseList, ...response['object']['testConductorHasTestCodeVoList']];
                  for (const license of this.licenseList) {
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
        pageNo: 1,
        pageSize: 10,
        searchKey: '',
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

  add(): void {
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
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
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
    this.pageNo += 1;
    this.get();
  }


}
