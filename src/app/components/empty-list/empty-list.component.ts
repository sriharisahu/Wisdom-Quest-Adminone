import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {
  @Input() addButtonLable: string;
  @Input() emptyListMsg: string;
  @Output() add$ = new EventEmitter<any>();

  constructor() {
   }

  ngOnInit() {
    this.addButtonLable = 'Add Item';
    this.emptyListMsg = 'List is empty click to add new item';
  }
  
  emitAdd() {
     this.add$.emit();
  }

}
