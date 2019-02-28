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
  selector: 'app-specialization-registration',
  templateUrl: './specialization-registration.component.html',
  styleUrls: ['./specialization-registration.component.scss']
})
export class SpecializationRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  specializationForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedSpecialization;
  get f() {
    return this.specializationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.specializationForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.specializationForm.value));
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService) {
  }

  ngOnInit() {

    let specializationForm = {};
    if (this.selectedSpecialization) {
      specializationForm = {
        specializationId: [this.selectedSpecialization.specializationId, Validators.required],
        specializationName: [this.selectedSpecialization.specializationName, Validators.required],
        specializationCode: [this.selectedSpecialization.specializationCode, Validators.required],
      };
    } else {


      specializationForm = {
        specializationName: ['', Validators.required],
        specializationCode: ['', Validators.required],
      };
    }

    this.specializationForm = this.formBuilder.group(specializationForm);
  }



}
