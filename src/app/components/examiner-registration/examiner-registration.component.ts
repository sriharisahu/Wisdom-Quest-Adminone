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
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-examiner-registration',
  templateUrl: './examiner-registration.component.html',
  styleUrls: ['./examiner-registration.component.scss']
})
export class ExaminerRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  examinerForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedExaminer: any;
  clientId;
  clientList;
  currentParams;
  collegeList;

  get f() {
    return this.examinerForm.controls;
  }



  getCollege(): void {
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

  onSubmit() {
    this.submitted = true;
    const client  = this.clientList.filter((_client) => {
    return _client.testConductorId === this.examinerForm.value.parentTestConductorId;
    });
    if (client) {
      this.examinerForm.patchValue({
        collegeId: client[0].collegeVo.collegeId
      });
    }
    if (this.examinerForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.examinerForm.value));
    requestPayload.collegeVo = {
      collegeId: this.examinerForm.value.collegeId
    };
    this.submit$.emit(requestPayload);
  }

  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private userService: UserService,
    private configurationService: ConfigurationService) {
  }
  get(): void {
    const req = {
      pageNo: 1,
      pageSize: 10,
      searchKey: '',
      active: true};
    this.userService.getClientList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.clientList = response['object']['testConductorVoList'];
                if (this.currentParams.clientId) {
                      this.examinerForm.patchValue({
                        parentTestConductorId: Number(this.currentParams.clientId)
                      });
                    debugger;
                }
        }
      }
    );
  }
  ngOnInit() {
    this.route.queryParams.pipe()
    .subscribe(params => {
      this.currentParams = params;
      this.get();
    });

    let examinerForm = {};
    if (this.selectedExaminer) {
      examinerForm = {
        testConductorId : [this.selectedExaminer.testConductorId, Validators.required],
        parentTestConductorId : [this.selectedExaminer.parentTestConductorId, Validators.required],
        firstName   : [this.selectedExaminer.firstName, Validators.required],
        lastName: [this.selectedExaminer.lastName, Validators.required],
        contactEmail: [this.selectedExaminer.contactEmail, Validators.required],
        password: [''],
        collegeId: [this.selectedExaminer.collegeVo.collegeId , Validators.required]
      };
    } else {


      examinerForm = {
        parentTestConductorId : [this.clientId ? this.clientId : '', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        contactEmail: ['', Validators.required],
        password: ['', Validators.required],
        collegeId: ['', Validators.required]
      };
    }

    this.examinerForm = this.formBuilder.group(examinerForm);
  }



}
