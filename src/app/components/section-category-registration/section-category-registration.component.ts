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
  selector: 'app-section-category-registration',
  templateUrl: './section-category-registration.component.html',
  styleUrls: ['./section-category-registration.component.scss']
})
export class SectionCategoryRegistrationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  sectionCategoryForm: FormGroup;
  title: string;
  loading = false;
  submitted = false;
  selectedSectionCategory: any;
  isCategory;
 
  get f() {
    return this.sectionCategoryForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.sectionCategoryForm.invalid) {
      return;
    }

    const requestPayload = JSON.parse(JSON.stringify(this.sectionCategoryForm.value));
    this.submit$.emit(requestPayload);
  }

  
  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService) {
  }

  ngOnInit() {

    let sectionCategoryForm = {};
    if (this.selectedSectionCategory) {
      sectionCategoryForm = {
        categoryId: [this.isCategory ?
          this.selectedSectionCategory.questionCategoryId : this.selectedSectionCategory.questionSubCategoryId, Validators.required],
        categoryName: [this.isCategory ?
          this.selectedSectionCategory.questionCategoryName : this.selectedSectionCategory.questionSubCategoryName, Validators.required]
      };

    } else {


      sectionCategoryForm = {
        categoryName: ['', Validators.required],
      };
     
    }

    this.sectionCategoryForm = this.formBuilder.group(sectionCategoryForm);
  }






}
