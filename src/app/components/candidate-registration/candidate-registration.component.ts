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
import { AuthenticationService } from 'src/app/service/authentecation.service';


@Component({
  selector: 'app-candidate-registration',
  templateUrl: './candidate-registration.component.html',
  styleUrls: ['./candidate-registration.component.scss']
})
export class CandidateRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  candidateForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedCandidate: any;
  collegeList;
  specializationList;
  get f() {
    return this.candidateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.candidateForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.candidateForm.value));
    if (this.authenticationService.currentUser.adminType === 'SUPERADMIN') {
    requestPayload.collegeVo  = {
      collegeId: this.candidateForm.value.collegeId
    };
  } else {
    requestPayload.collegeVo  = {
      collegeId: this.authenticationService.currentUser.collegeVo.collegeId
    };
  }

    requestPayload.specializationVo  = {
      specializationId: this.candidateForm.value.specializationId
    };
    requestPayload.dateOfBirth = new Date(requestPayload.dateOfBirth).getTime();
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService,
    public authenticationService: AuthenticationService
    ) {
  }

  ngOnInit() {

    let candidateForm = {};
    if (this.selectedCandidate) {
      candidateForm = {
        userId: [this.selectedCandidate.userId],
        active: true,
        addressLine1: [this.selectedCandidate.addressLine1],
        addressLine2: [this.selectedCandidate.addressLine2],
        adhaarNumber: [this.selectedCandidate.adhaarNumber],
        city: [this.selectedCandidate.city],
        contactEmail: [this.selectedCandidate.contactEmail, Validators.required],
        contactNumber: [this.selectedCandidate.contactNumber, Validators.required],
        country: [this.selectedCandidate.country],
        dateOfBirth: [new Date(this.selectedCandidate.dateOfBirth)],
        firstName: [this.selectedCandidate.firstName],
        gender: [this.selectedCandidate.gender],
        lastName: [this.selectedCandidate.lastName],
        middleName: [this.selectedCandidate.middleName],
        password: [''],
        pinCode: [this.selectedCandidate.pinCode],
        specializationId: [this.selectedCandidate.specializationVo.specializationId, Validators.required],
        state: [this.selectedCandidate.state],
        tenthPercentage: [this.selectedCandidate.tenthPercentage]
      };
      if (this.authenticationService.currentUser.adminType === 'SUPERADMIN') {
        candidateForm['collegeId']  =  [this.selectedCandidate.collegeVo.collegeId, Validators.required];
      }
    } else {


      candidateForm = {
        active: true,
        addressLine1: [''],
        addressLine2: [''],
        adhaarNumber: [''],
        city: [''],
        contactEmail: ['', Validators.required],
        contactNumber: ['', Validators.required],
        country: [''],
        dateOfBirth: [new Date()],
        firstName: [''],
        gender: [''],
        lastName: [''],
        middleName: [''],
        password: [''],
        pinCode: [''],
        specializationId: ['', Validators.required],
        state: [''],
        tenthPercentage: ['']
      };

      if (this.authenticationService.currentUser.adminType === 'SUPERADMIN') {
        candidateForm['collegeId']  =  ['', Validators.required];
      }
    }

    if (this.authenticationService.currentUser.adminType === 'SUPERADMIN'){
      this.getCollegeList();
    }
    this.getSpecializationList();
    this.candidateForm = this.formBuilder.group(candidateForm);
  }

  getCollegeList(): void {
    const req = {
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      active: true};
    this.configurationService.getCollegeList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.collegeList = response['object']['collegeVoList'];
        }
      }
    );
  }

  getSpecializationList(): void {
    const req = {
      pageNo: 1,
      pageSize: 10,
      searchKey: '',
      active: true};
    this.configurationService.getSpecializationList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.specializationList = response['object']['specializationVoList'];
        }
      }
    );
  }



}
