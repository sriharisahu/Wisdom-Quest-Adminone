import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, subscribeOn } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalVariable } from 'src/app/constant/global.variable';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  examId;
  candidateId;
  certificate;
  constructor(private http: HttpClient) {
   }

  ngOnInit() {
    const req = {
      examId: this.examId,
      candidateId: this.candidateId
    };
    this.http.post<any>(`${GlobalVariable.BASE_API_URL}exam/get-certificate`, req)
        .pipe( map(response => {
            if (response['status'] === 'success') {
                if (response['object']) {
                    return response['object'];
                }
            } else {
                return response;
            }
        },
        err => {
          return of({});
        }
        ), catchError((_err) => {
          return _err;
        })).subscribe(
          (certificate) => {
            if (certificate) {
              this.certificate = certificate;
            } else {

            }
          }
        );
  }

}
