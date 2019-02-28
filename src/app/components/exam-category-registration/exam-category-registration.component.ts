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
  selector: 'app-exam-category-registration',
  templateUrl: './exam-category-registration.component.html',
  styleUrls: ['./exam-category-registration.component.scss']
})
export class ExamCategoryRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  examCategoryForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedExamCategory: any;
  isCategory;
  get f() {
    return this.examCategoryForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.examCategoryForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.examCategoryForm.value));
    this.submit$.emit(requestPayload);
  }


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService) {
  }

  ngOnInit() {

    let examCategoryForm = {};
    if (this.selectedExamCategory) {
      examCategoryForm = {
        categoryId: [this.isCategory ?
          this.selectedExamCategory.examCategoryId : this.selectedExamCategory.examSubCategoryId, Validators.required],
        categoryName: [this.isCategory ?
          this.selectedExamCategory.examCategoryName : this.selectedExamCategory.examSubCategoryName, Validators.required]
      };
    } else {


      examCategoryForm = {
        categoryName: ['', Validators.required],
      };
    }

    this.examCategoryForm = this.formBuilder.group(examCategoryForm);
  }





}
