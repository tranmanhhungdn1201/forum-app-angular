import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html'
})
export class CreateQuestionModal {
  questionText: string = '';
  constructor(
    public activeModal: NgbActiveModal,
    private questionService: QuestionService
  ) { }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  onSubmit() {
    let question = {
      "id": Math.floor(Math.random() * 100),
      "categoryID": 1,
      "title": this.questionText,
      "like": 0,
      "dislike": 0
    };
    this.questionService.addQuestion(question).subscribe(data => {
      this.closeModal(data);
    });
  }
}
