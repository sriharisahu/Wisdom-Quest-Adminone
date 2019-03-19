import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-candidate-filter',
  templateUrl: './candidate-filter.component.html',
  styleUrls: ['./candidate-filter.component.scss']
})
export class CandidateFilterComponent implements OnInit {

  loading = false;
  candidateList = [];
  listEnd = true;
  totalCount = 0;
  pageNo = 1;
  userIdList = [];
  userIdAllocatedList = [];
  licenseUserList = [];
  currentParams;
  examId;
  percentile = 0 ;
  @Output() submit$ = new EventEmitter();
  constructor(private configurationService: ConfigurationService,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.pipe()
    .subscribe(params => {
      this.currentParams = params;
      this.get();
    });
  }
  filter() {
    this.candidateList = [];
    this.get();
  }

get(): void {
  this.loading = true;
    const req = {
      pageNo: 1,
      pageSize: 1000,
      searchKey: '',
      examId: this.examId,
      percentile: Number(this.percentile),
      active: true
    };
    this.userService.getFilterCandidateList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
          this.candidateList = [...this.candidateList, ...response['object']['examResult']];
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




  onScroll() {
    this.pageNo += 1;
    this.get();
  }
}
