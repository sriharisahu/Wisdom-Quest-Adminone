import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigurationService } from '../service/configuration.service';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-license-candidate-mapping',
  templateUrl: './license-candidate-mapping.component.html',
  styleUrls: ['./license-candidate-mapping.component.scss']
})
export class LicenseCandidateMappingComponent implements OnInit {

  loading = false;
  candidateList = [];
  listEnd = true;
  totalCount = 0;
  pageNo = 1;
  userIdList = [];
  userIdAllocatedList = [];
  licenseUserList = [];
  currentParams;
  @Output() submit$ = new EventEmitter();
  constructor(private configurationService: ConfigurationService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.pipe()
    .subscribe(params => {
      this.currentParams = params;
      this.get();
      this.getAllocated();
    });
  }
select(candidate) {
  this.userIdList.push(candidate.userId);
}
deselect(candidate) {
  this.userIdList = this.userIdList.filter((userId) => {
  return  Number(userId) !== Number(candidate.userId);
  });
}
get(): void {
  this.loading = true;
    const req = {
      pageNo: 1,
      pageSize: 100,
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

getAllocated() {
  const reqLicense = {
    pageNo: this.pageNo,
    pageSize: 500,
    testConductorLicenseId: this.currentParams.licenseId,
    };

  this.userService.getLicenseCandidateList(reqLicense).subscribe(
    (responseLicense) => {
      this.loading = false;
      if (responseLicense['status'] === 'success') {
              this.licenseUserList = [...this.licenseUserList, ...responseLicense['object']['testConductorHasTestCodeVoList']];
              for (const license of this.licenseUserList) {
                this.userIdAllocatedList.push(license.userVo.userId);
              }
      }
    }
  );
}

  mapLicenseCandidate() {
    const request = {
      userIdList: this.userIdList,
      };
    this.submit$.emit(request);

  }

  loadMore() {
    this.pageNo += 1;
    this.get();
  }

}
