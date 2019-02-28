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
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  clientForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedClient: any;
  collegeList;
  get f() {
    return this.clientForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.clientForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.clientForm.value));
    requestPayload.collegeVo = {
      collegeId: this.clientForm.value.collegeId
    };
    this.submit$.emit(requestPayload);
  }

  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService) {
  }

  ngOnInit() {

    let clientForm = {};
    if (this.selectedClient) {
      clientForm = {
        testConductorId : [this.selectedClient.testConductorId, Validators.required],
        firstName   : [this.selectedClient.firstName, Validators.required],
        lastName: [this.selectedClient.lastName, Validators.required],
        contactEmail: [this.selectedClient.contactEmail, Validators.required],
        password: [''],
        collegeId: [this.selectedClient.collegeVo.collegeId , Validators.required]
      };
    } else {


      clientForm = {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        contactEmail: ['', Validators.required],
        password: ['', Validators.required],
        collegeId: ['', Validators.required]
      };
    }

    this.clientForm = this.formBuilder.group(clientForm);
  }



}
