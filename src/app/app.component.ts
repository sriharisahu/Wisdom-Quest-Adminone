import { Component } from '@angular/core';
import { ExamService } from './service/exam.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public examService: ExamService) {

  }
  title = 'admin';
  detach() {
    this.examService.questionToAttach = null;
  }
}
