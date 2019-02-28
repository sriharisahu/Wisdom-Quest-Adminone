import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  @Output() submit$ = new EventEmitter < any > ();
  title: string;

  onSubmit(confirm) {
    this.submit$.emit(confirm);
  }


  constructor(
    public bsModalRef: BsModalRef) {
  }

  ngOnInit() {

  }


}
