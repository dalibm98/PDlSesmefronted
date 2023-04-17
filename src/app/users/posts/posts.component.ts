
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { User } from 'src/app/model/user';
import { QuestionService } from 'src/app/service/question.service';
import { throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

reponse : Response [] = [] ; 
  
  questions: Question[] = [];

constructor(private questionService: QuestionService ,  private authservice : AuthenticationService ) { }

ngOnInit(): void {
  this.questionService.consulterQuestions().subscribe(
    (questions: Question[]) => {
      this.questions = questions;
    },
    (error) => {
      console.log(error);
    }
  );
}

showReponses(questionId: number) {
  const question = this.questions.find((q) => q.id_question === questionId);
  if (question) {
    question.showReponses = !question.showReponses;
    if (question.showReponses && !question.reponses) {
      this.questionService.consulterReponses(questionId).subscribe(
        (reponses: Reponse[]) => {
          question.reponses = reponses;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}



}
