import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentecation.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() toggle: boolean;


  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
