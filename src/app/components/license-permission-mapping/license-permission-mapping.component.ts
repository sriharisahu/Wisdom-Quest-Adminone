import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfigurationService } from 'src/app/service/configuration.service';

@Component({
  selector: 'app-license-permission-mapping',
  templateUrl: './license-permission-mapping.component.html',
  styleUrls: ['./license-permission-mapping.component.scss']
})
export class LicensePermissionMappingComponent implements OnInit {

  loading = false;
  permissionList = [];
  listEnd = true;
  totalCount = 0;
  pageNo = 1;
  permissionIdList = [];
  @Output() submit$ = new EventEmitter();
  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.get();
  }
select(permission) {
  this.permissionIdList.push(permission.permissionId);
}
deselect(permission) {
  this.permissionIdList = this.permissionIdList.filter((permissionId) => {
  return  Number(permissionId) !== Number(permission.permissionId);
  });
}
  get(): void {
    const req = {
      pageNo: this.pageNo,
      pageSize: 100,
      searchKey: '',
      active: true};
    this.configurationService.getPermissionList(req).subscribe(
      (response) => {
        this.loading = false;
        if (response['status'] === 'success') {
                this.permissionList = [...this.permissionList, ...response['object']['permissionVoList']];
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

  mapLicensePermission() {
    const request = {
      active: true,
      permissionIdList: this.permissionIdList,
      };
    this.submit$.emit(request);

  }

  onScroll() {
    this.pageNo += 1;
    this.get();
  }

}
