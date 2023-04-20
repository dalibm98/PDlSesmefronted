import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-modifpost',
  templateUrl: './modifpost.component.html',
  styleUrls: ['./modifpost.component.scss']
})
export class ModifpostComponent implements OnInit {
  userId!: number;
  userQuestions: Question[] = [];

  constructor(
    private authService: AuthenticationService,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const user$ = this.authService.getCurrentUser(authToken);
      user$.subscribe((user) => {
        this.userId = user.id;
        this.loadQuestions();
      });
    }
  }

  loadQuestions() {
    const questions$ = this.questionService.consulterQuestionss(this.userId);
    questions$.subscribe((questions) => {
      this.userQuestions = questions.filter(
        (question) => question.auteur.id === this.userId
      );
    });
  }
}

