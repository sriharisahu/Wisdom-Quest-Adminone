import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-license-key',
  templateUrl: './license-key.component.html',
  styleUrls: ['./license-key.component.scss']
})
export class LicenseKeyComponent implements OnInit {
  @Output() submit$ = new EventEmitter < any > ();
  title: string;
  key: string;
  license;

  onSubmit(confirm) {
    this.submit$.emit(confirm);
  }


  constructor(
    private userService:  UserService,
    public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    const request = {
      testConductorLicenseId: Number(this.license.testConductorLicenseId)
    };
    this.userService.viewLicenseKey(request).subscribe(
      (response) => {
        if (response['status'] === 'success') {
          this.key = response['object']['testConductorLicenseCode'];
          }
      }
    );

  }


}
