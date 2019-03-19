import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { CollegeRegistrationComponent } from '../college-registration/college-registration.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { AuthenticationService } from 'src/app/service/authentecation.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService,
    private configurationService: ConfigurationService,
    public authenticationService: AuthenticationService) { }

  toggle = false;
  loading = false;
  listEnd = true;
  collegeList = [];
  totalCount = 0;
  pageNo = 1;

  ngOnInit() {
    this.get();
  }
  toggleSideMenu(event) {
    this.toggle = !this.toggle;
  }
  get(): void {
    this.loading = true;
    const req = {
      pageNo: this.pageNo,
      pageSize: 10,
      searchKey: '',
      active: true};
    this.configurationService.getCollegeList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.collegeList = [...this.collegeList, ...response['object']['collegeVoList']];
                if (req.pageNo === 1) {
                  this.totalCount = response['object']['count'];
                }
                if ((req.pageNo * req.pageSize) >= this.totalCount) {
                   this.listEnd = true;
                } else {
                  this.listEnd = false;
                }
        }
      }
    );
  }

  add(): void {
    const configuartion = {
      initialState : {
        title: 'College Registration Form'
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(CollegeRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.configurationService.createCollege(request).subscribe(
          (response) => {
            if (response['status'] === 'success') {
              this.collegeList = [];
              this.pageNo = 1;
              this.get();
              this.bsModalService.hide(1);
            }
          }
        );
      }
    );
  }

  edit(selectedCollege): void {
    const configuartion = {
      initialState : {
        title: 'College Update Form',
        selectedCollege: selectedCollege
      },
      class: 'modal-lg'
    };
    this.bsModalService.show(CollegeRegistrationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (request) => {
        this.configurationService.updateCollege(request).subscribe(
          (response) => {
            this.collegeList = [];
            this.pageNo = 1;
            this.get();
            this.bsModalService.hide(1);
          }
        );
      }
    );
  }



  delete(selectedCollege): void {


    const configuartion = {
      initialState : {
        title: 'Delete College'
      },
      class: 'modal-sm'
    };
    this.bsModalService.show(DeleteConfirmationComponent, configuartion)
    .content
    .submit$
    .subscribe(
      (confirm) => {
           if (confirm) {
             const request = { ...selectedCollege, active: false };
            this.configurationService.updateCollege(request).subscribe(
              (response) => {
                this.get();
              }
            );
           }
           this.bsModalService.hide(1);
      }
    );
  }

  onScroll() {
    this.pageNo += 1;
    this.get();
  }

}
