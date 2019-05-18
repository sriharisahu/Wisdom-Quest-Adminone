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
  candidateList: [] ;
  specializationList = [];
  collageList = [];
  loading = false;
  @Output() submit$ = new EventEmitter < any > ();
  candidateForm: FormGroup;
  get f() {
    return this.candidateForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private configurationService: ConfigurationService,
    public authenticationService: AuthenticationService) {}
  ngOnInit() {
    this.getSpecializationList();
    this.getCollageList();
    this.candidateList = [];
    let candidateForm = {};
    candidateForm = {
      specializationId: ['', Validators.required],
      collageId: ['', Validators.required],
    };
    this.candidateForm = this.formBuilder.group(candidateForm);
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    alert(this.csvContent);
    debugger;
  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;

   if (files && files.length) {
        console.log('Filename: ' + files[0].name);
        console.log('Type: ' + files[0].type);
        console.log('Size: ' + files[0].size + ' bytes');

        const fileToRead = files[0];

        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;

        fileReader.readAsText(fileToRead, 'UTF-8');
        fileReader.onload = (e) => {
          const csv = fileReader.result;
          const allTextLines = csv.toString().split(/\r|\n|\r/);
          const headers = allTextLines[0].split(',');
          const lines = [];
          for (let i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            const data = allTextLines[i].split(',');
            if (data.length === headers.length) {
              const tarr = [];
              for (let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
              }
              // log each row to see output 
              console.log(tarr);
              lines.push(tarr);
            }
          }
          // all rows in the csv file 
          console.log(">>>>>>>>>>>>>>>>>", lines);
        };
   }

  }

  getCollageList(): void {
    const req = {
      pageNo: 1,
      pageSize: 100,
      searchKey: '',
      active: true};
    this.configurationService.getCollegeList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.collageList = response['object']['collegeVoList'];
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
