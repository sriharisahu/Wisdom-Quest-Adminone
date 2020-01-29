import { Component, OnInit, ViewChild, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { query } from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('search', { static: true }) search;
  @Output() searchKey =  new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }


trigger() {
  this.searchKey.emit(this.search.nativeElement.value);
}
clear() {
  this.search.nativeElement.value = '';
  this.trigger();
}

}
