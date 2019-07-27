import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap';
import { GlobalVariable } from 'src/app/constant/global.variable';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  Object = Object;

  examId;
  candidateId;
  result;
  eai;
  eaiSummary;
  title;
  testConductorHasTestCodeId;


  constructor(private http: HttpClient,
    public bsModalRef: BsModalRef) {
   }

  ngOnInit() {
    this.title = 'Result of Exam';
    const req = {
      examId: this.examId,
      candidateId: this.candidateId,
      testConductorHasTestCodeId: this.testConductorHasTestCodeId

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
  }


