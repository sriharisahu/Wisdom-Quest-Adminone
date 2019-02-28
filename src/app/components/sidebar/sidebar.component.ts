import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() toggle: boolean;

  constructor() { }

  ngOnInit() {
  }

}
