import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  BsModalRef
} from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from 'src/app/service/exam.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-license-registration',
  templateUrl: './license-registration.component.html',
  styleUrls: ['./license-registration.component.scss']
})
export class LicenseRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  licenseForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedLicense: any;
  currentParams;
  examList;
  get f() {
    return this.licenseForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.licenseForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.licenseForm.value));
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private examService: ExamService,
    private userService: UserService,
    private configurationService: ConfigurationService) {
  }

  get(): void {
    this.loading = true;
    if (this.currentParams.clientId && this.currentParams.examinerId) {
      const req = {
        pageNo: 1,
        pageSize: 10,
        testConductorId: this.currentParams.clientId
        };

      this.userService.getClientLicenseList(req).subscribe(
        (response) => {
          this.loading = false;
          if (response['status'] === 'success') {
                const licenseList = response['object']['testConductorLicenseVoList'];
                this.examList = licenseList.map((license) => {
                         return license.examVo;
                });

          }
        }
      );

    } else {
    const req = {
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      active: true};
    this.examService.getExamList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.examList = response['object']['examVoList'];
        }
      }
    );
  }
}

  ngOnInit() {
    this.route.queryParams.pipe()
    .subscribe(params => {
      this.currentParams = params;

      this.get();
    });


    let licenseForm = {};
    if (this.selectedLicense) {
      licenseForm = {
        testConductorLicenseId: [this.selectedLicense.testConductorLicenseId, Validators.required],
        examId : [this.selectedLicense.examVo ? this.selectedLicense.examVo.examId : '', Validators.required],
        licenseCount: [this.selectedLicense.licenseCount, Validators.required],
      };
    } else {

      if (this.currentParams.candidateId) {
        licenseForm = {
          examId: ['', Validators.required],
        };

      } else {
        licenseForm = {
          examId: ['', Validators.required],
          licenseCount: ['', Validators.required],
        };

      }
    }

    this.licenseForm = this.formBuilder.group(licenseForm);
  }



}
