import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GlobalVariable } from 'src/app/constant/global.variable';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-exam-analysis',
  templateUrl: './exam-analysis.component.html',
  styleUrls: ['./exam-analysis.component.scss'],
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
export class ExamAnalysisComponent implements OnInit {
  Object = Object;
  loading = false;
  candidateList = [];
  listEnd = true;
  totalCount = 0;
  pageNo = 1;
  userIdList = [];
  userIdAllocatedList = [];
  licenseUserList = [];
  currentParams;
  selectedCandidate;
  isPsychometric = false;
  examId;
  percentile = 0 ;
  result = [];
  eai = [];
  eaiSummary;
  @Output() submit$ = new EventEmitter();
 public doughnutChartLabels: Label[] = ['0%-30%', '30%-60%', '60%-80%', '80%-100%'];
 public doughnutChartData: MultiDataSet = [];
 public doughnutChartReady = false;
 lessThan30CountO = 0;
 between30And60CountO = 0;
 between60And80CountO = 0;
 between80And100CountO = 0;
  lessThan30Count = [0, 0, 0, 0];
  between30And60Count = [0, 0, 0, 0];
  between60And80Count = [0, 0, 0, 0];
  between80And100Count = [0, 0, 0, 0];
  userMarks = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Marks' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartSectionData: ChartDataSets[] = [
    { data: [], label: 'Marks' },
  ];
  public lineChartSectionLabels: Label[] = [];
  isEffectiveCommunication: boolean;
  isProblemSolving: boolean;
  isCriticalThinking: boolean;
  isPositiveAttitude: boolean;

  constructor(private configurationService: ConfigurationService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.pipe()
    .subscribe(params => {
      this.currentParams = params;
      this.get();
    });
  }

  toggleSection = (candidate) => {
    if (this.selectedCandidate === candidate) {
      this.selectedCandidate = null;

    } else {
      this.selectedCandidate = candidate;
      this.getCandidateDetails(candidate);
      const userData = [];
      if (this.selectedCandidate.sectionResultList) {
        this.selectedCandidate.sectionResultList.forEach((section) => {
          userData.push(section.userMarks);
        });
      }

      this.lineChartSectionData = [
        {data: userData, label: 'Marks'}
      ];

    }
  }
  filter() {
    this.candidateList = [];
    this.get();
  }

  normalizeDoughnutDataSet(): void {
    this.lessThan30CountO = 0;
    this.between30And60CountO = 0;
    this.between60And80CountO = 0;
    this.between80And100CountO = 0;
     this.lessThan30Count = [0, 0, 0, 0];
     this.between30And60Count = [0, 0, 0, 0];
     this.between60And80Count = [0, 0, 0, 0];
     this.between80And100Count = [0, 0, 0, 0];

  }

get(): void {
  this.loading = true;
    const req = {
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      examId: this.currentParams.examId,
      percentile: Number(this.percentile),
      active: true
    };
    this.userService.getFilterCandidateList(req).subscribe(
      (response) => {
        this.loading = false;
        this.doughnutChartReady = false;
        if (response['status'] === 'success') {
          this.candidateList = [...this.candidateList, ...response['object']['examResult']];
          if (this.pageNo === 1) {
            this.totalCount = response['object']['count'];
          }
          this.normalizeDoughnutDataSet();
          this.candidateList.forEach((candidate, index) => {

            if (candidate.sectionResultList) {
                  candidate.sectionResultList.forEach((section) => {
                    if (section.examSectionName === 'Psychometric') {
                         this.isPsychometric = true;
                    }
                    // Effective Communication, Problem Solving, Critical Thinking, Positive Attitude
                    if(section && section.hasOwnProperty("questionCategoryVoList") && section.questionCategoryVoList.length > 0){
                      section.questionCategoryVoList.forEach((subSection) => {
                        if (subSection.questionSubCategoryName === 'Effective Communication') {
                          this.isEffectiveCommunication = true;
                          candidate.effectiveCommunication = subSection.userTotalMarks;
                        }
                        if (subSection.questionSubCategoryName === 'Problem Solving') {
                          this.isProblemSolving = true;
                          candidate.problemSolving = subSection.userTotalMarks;
                        }
                        if (subSection.questionSubCategoryName === 'Critical Thinking') {
                          candidate.criticalThinking = subSection.userTotalMarks;
                        }
                        if (subSection.questionSubCategoryName === 'Positive Attitude') {
                          candidate.positiveAttitude = true;
                        }
                      });
                    }
              });
            }
            this.userMarks.push(Number(candidate.userTotalMarks));
            this.lineChartLabels.push(index.toLocaleString());
            // overall
            const x = candidate.userTotalMarks / candidate.totalMarks;
           if (x <= 0.3) {
             this.lessThan30CountO++;
           }
           if (x > 0.3 && x <= 0.6) {
            this.between30And60CountO++;
           }
           if (x > 0.6 && x <= 0.8) {
            this.between60And80CountO++;
           }
           if (x > 0.8 && x <= 1) {
            this.between60And80CountO++;
           }
           // mathematics
           if (candidate.sectionResultList[0]) {
            const y  = candidate.sectionResultList[0].userTotalMarks / candidate.sectionResultList[0].totalMarks;
            if (y <= 0.3) {
             this.lessThan30Count[0]++;
           }
           if (y > 0.3 && y <= 0.6) {
             this.between30And60Count[0]++;
           }
           if (y > 0.6 && y <= 0.8) {
             this.between60And80Count[0]++;
           }
           if (y > 0.8 && y <= 1) {
             this.between80And100Count[0]++;
           }
           }
           if (candidate.sectionResultList[1]) {
            const y  = candidate.sectionResultList[1].userTotalMarks / candidate.sectionResultList[1].totalMarks;
            if (y <= 0.3) {
              this.lessThan30Count[1]++;
            }
            if (y > 0.3 && y <= 0.6) {
              this.between30And60Count[1]++;
            }
            if (y > 0.6 && y <= 0.8) {
              this.between60And80Count[1]++;
            }
            if (y > 0.8 && y <= 1) {
              this.between80And100Count[1]++;
            }
           }
           if (candidate.sectionResultList[2]) {
            const y  = candidate.sectionResultList[2].userTotalMarks / candidate.sectionResultList[2].totalMarks;
            if (y <= 0.3) {
              this.lessThan30Count[2]++;
            }
            if (y > 0.3 && y <= 0.6) {
              this.between30And60Count[2]++;
            }
            if (y > 0.6 && y <= 0.8) {
              this.between60And80Count[2]++;
            }
            if (y > 0.8 && y <= 1) {
              this.between80And100Count[2]++;
            }
           }
           if (candidate.sectionResultList[3]) {
            const y  = candidate.sectionResultList[3].userTotalMarks / candidate.sectionResultList[3].totalMarks;
            if (y <= 0.3) {
              this.lessThan30Count[3]++;
            }
            if (y > 0.3 && y <= 0.6) {
              this.between30And60Count[3]++;
            }
            if (y > 0.6 && y <= 0.8) {
              this.between60And80Count[3]++;
            }
            if (y > 0.8 && y <= 1) {
              this.between80And100Count[3]++;
            }
           }
          });
          this.doughnutChartData = [
            [this.lessThan30CountO, this.between30And60CountO, this.between60And80CountO, this.between80And100CountO],
            [this.lessThan30Count[0], this.between30And60Count[0], this.between60And80Count[0], this.between80And100Count[0]],
            // tslint:disable-next-line:no-unused-expression
            [this.lessThan30Count[1], this.between30And60Count[1], this.between60And80Count[1], this.between80And100Count[1]],
            // tslint:disable-next-line:no-unused-expression
            [this.lessThan30Count[2], this.between30And60Count[2], this.between60And80Count[2], this.between80And100Count[2]],
            // tslint:disable-next-line:no-unused-expression
            [this.lessThan30Count[3], this.between30And60Count[3], this.between60And80Count[3], this.between80And100Count[3]]
          ];
          this.lineChartData = [
            { data: this.userMarks, label: 'Marks' },
          ];

             this.doughnutChartReady = true;
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


getCandidateDetails = (candidate) => {
  const req = {
    examId: candidate.examId,
    candidateId: candidate.candidateId,
    testConductorHasTestCodeId: candidate.testConductorHasTestCodeId ? candidate.testConductorHasTestCodeId : 1491

  };
  this.http.post<any>(`${GlobalVariable.BASE_API_URL}exam/result-by-examId`, req)
      .pipe( map(response => {
          if (response['status'] === 'success') {
              if (response['object']) {
                  return response['object'];
              }
          } else {
              return of({});
          }
      },
      err => {
        return of({});
      }
      ), catchError((_err) => {
        return of({});
      })).subscribe(
        (result) => {
         this.result = result;
        }
      );
      this.http.post<any>(`${GlobalVariable.BASE_API_URL}exam/get-eai-certificate`, req)
      .pipe( map(response => {
          if (response['status'] === 'success') {
              if (response['list']) {
                  return response['list'];
              }
          } else {
              return of([]);
          }
      },
      err => {
        return of([]);
      }
      ), catchError((_err) => {
        return of({});
      })).subscribe(
        (eai) => {
         this.eai = eai;
        }
      );

      this.http.post<any>(`${GlobalVariable.BASE_API_URL}exam/get-eai-summary`, req)
      .pipe( map(response => {
          if (response['status'] === 'success') {
              if (response['object']) {
                  return response['object'];
              }
          } else {
              return of([]);
          }
      },
      err => {
        return of([]);
      }
      ), catchError((_err) => {
        return of({});
      })).subscribe(
        (eaiSummary) => {
         this.eaiSummary = eaiSummary;
        }
      );
}




  onScroll() {
    this.pageNo += 1;
    this.get();
  }
}
