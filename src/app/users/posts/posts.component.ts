import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { User } from 'src/app/model/user';
import { QuestionService } from 'src/app/service/question.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogquestionaddComponent } from '../dialogquestionadd/dialogquestionadd.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  questions: Question[] = [];
  private apiUrl = 'http://localhost:8081/api/v1/auth';
users : User [] = [] ; 
  constructor(
    private questionService: QuestionService,
    private authservice: AuthenticationService ,
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

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

addReponse(questionId: number, responseContent: string) {
  const url = `${this.apiUrl}/questions/${questionId}/reponses`;
  const authToken = this.authservice.getAuthToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  const dateCreation = new Date(Date.now());
  const requestBody = { contenu: responseContent  , dateCreation: dateCreation};

  return this.http.post(url, requestBody, { headers }).subscribe(
    (response) => {
      // refresh the list of answers for the current question
      const questionIndex = this.questions.findIndex((q) => q.id_question === questionId);
      if (questionIndex >= 0) {
        this.questionService.consulterReponses(questionId).subscribe(
          (reponses: Reponse[]) => {
            this.questions[questionIndex].reponses = reponses;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    (error) => {
      console.log(error);
    }
  );
}

openDialog(): void {
  const dialogRef = this.dialog.open(DialogquestionaddComponent, {
    width: '650px',
    height: '800px',
  });
}

}


