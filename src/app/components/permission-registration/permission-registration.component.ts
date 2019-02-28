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
  selector: 'app-permission-registration',
  templateUrl: './permission-registration.component.html',
  styleUrls: ['./permission-registration.component.scss']
})
export class PermissionRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  permissionForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedPermission: any;
  get f() {
    return this.permissionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.permissionForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.permissionForm.value));
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService) {
  }

  ngOnInit() {

    let permissionForm = {};
    if (this.selectedPermission) {
      permissionForm = {
        permissionName: [this.selectedPermission.permissionName, Validators.required],
        permissionId: [this.selectedPermission.permissionId, Validators.required],
      };
    } else {


      permissionForm = {
        permissionName: ['', Validators.required],
      };
    }

    this.permissionForm = this.formBuilder.group(permissionForm);
  }



}
