import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { AuthenticationService } from 'src/app/service/authentecation.service';

@Component({
  selector: 'app-import-from-csv',
  templateUrl: './import-from-csv.component.html',
  styleUrls: ['./import-from-csv.component.scss']
})
export class ImportFromCsvComponent implements OnInit {

  csvContent: string;
  title: string;
  candidateList =  [] ;
  specializationList = [];
  collegeList = [];
  loading = false;
  submitted: boolean;
  toggle: boolean;
  listEnd: boolean;
  @Output() submit$ = new EventEmitter < any > ();
  candidateForm: FormGroup;
  get f() {
    return this.candidateForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService,
    public authenticationService: AuthenticationService) {}

    save() {
   this.submit$.emit(this.candidateList);
    }
  ngOnInit() {
    this.getSpecializationList();
    this.getCollegeList();
    this.candidateList = [];
    let candidateForm = {};
    candidateForm = {
      specializationId: ['', Validators.required],
      collegeId: ['', Validators.required],
    };
    this.candidateForm = this.formBuilder.group(candidateForm);
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;

   if (files && files.length) {
        const fileToRead = files[0];
        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;

        fileReader.readAsText(fileToRead, 'UTF-8');
        const candidateList = [];
        fileReader.onload = (e) => {
          const csv = fileReader.result;
          const allTextLines = csv.toString().split(/\r|\n|\r/);
          const headers = allTextLines[0].split(',');
          const lines = [];
          for (let i = 1; i < allTextLines.length; i++) {
            const data = allTextLines[i].split(',');
            if (data.length === headers.length) {
                const cadidate = {
                  contactEmail: data[0],
                  contactNumber: data[1],
                  firstName: data[2],
                  lastName: data[3],
                  gender: data[4].toUpperCase(),
                  specializationVo: {
                    specializationId: this.candidateForm.value.specializationId
                  },
                  collegeVo: {
                    collegeId: this.candidateForm.value.collegeId
                  }
                };
                candidateList.push(cadidate);
            }
          }
          this.candidateList =  candidateList;
        };
   }
   input.value = '';

  }

  delete(candidate) {
      this.candidateList = this.candidateList.filter((can) => {
          return can.contactEmail !== candidate.contactEmail;
      });
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
