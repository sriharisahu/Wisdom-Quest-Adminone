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


@Component({
  selector: 'app-college-registration',
  templateUrl: './college-registration.component.html',
  styleUrls: ['./college-registration.component.scss']
})
export class CollegeRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  collegeRegistrationForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedCollege: any;
  get f() {
    return this.collegeRegistrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.collegeRegistrationForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.collegeRegistrationForm.value));
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService) {
  }

  ngOnInit() {

    let collegeForm = {};
    if (this.selectedCollege) {
      collegeForm = {
        collegeId : [this.selectedCollege.collegeId, Validators.required],
        collegeName: [this.selectedCollege.collegeName, Validators.required],

        addressLine1: [this.selectedCollege.addressLine1, Validators.required],
        addressLine2: [this.selectedCollege.addressLine2, Validators.required],
        city: [this.selectedCollege.city, Validators.required],
        pinCode: [this.selectedCollege.pinCode, Validators.required],
        state: [this.selectedCollege.state, Validators.required],
        country: [this.selectedCollege.country, Validators.required],
      };
    } else {


      collegeForm = {
        collegeName: ['', Validators.required],

        addressLine1: ['', Validators.required],
        addressLine2: ['', Validators.required],
        city: ['', Validators.required],
        pinCode: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
      };
    }

    this.collegeRegistrationForm = this.formBuilder.group(collegeForm);
  }



}
