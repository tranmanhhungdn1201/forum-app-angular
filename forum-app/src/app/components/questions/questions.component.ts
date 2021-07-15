import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/Question';
import { QuestionService } from 'src/app/services/question.service';
import { CreateQuestionModal } from './modals/create-question/create-question.component';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs'
import { faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faCommentDots = faCommentDots;
  questions: Question[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private questionService: QuestionService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let slug = this.activeRoute.snapshot.params['title'];
    this.questionService.getQuestionBySlugCategory(slug).subscribe((data) => {
      this.questions = data;
    });
  }

  openModalCreate() {
    let dialogRef = this.modalService.open(CreateQuestionModal, {ariaLabelledBy: 'modal-basic-title'});
    //create question
    dialogRef.closed.subscribe((data) => {
      if(data !== 'dismiss')
      this.questions.push(data);
    })
  }

  likeQuestion(question) {
    question.like += 1;
    this.questionService.updateQuestion(question).subscribe();
  }

  dislikeQuestion(question) {
    question.dislike += 1;
    this.questionService.updateQuestion(question).subscribe();
  }
}
