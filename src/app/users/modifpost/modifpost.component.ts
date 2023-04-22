import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-modifpost',
  templateUrl: './modifpost.component.html',
  styleUrls: ['./modifpost.component.scss'],
})
export class ModifpostComponent implements OnInit {
  userId!: number;
  userQuestions: Question[] = [];
  questionId!: number;

  @ViewChild('deleteConfirmation') deleteConfirmation!: TemplateRef<any>; // define deleteConfirmation as a property

  onDeleteQuestionId: number | null = null;
  constructor(
    private authService: AuthenticationService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      const questionIdParam = params.get('questionId');
      if (questionIdParam !== null) {
        this.questionId = parseInt(questionIdParam);
      }
    });
  }

  loadQuestions() {
    const questions$ = this.questionService.consulterQuestionss(this.userId);
    questions$.subscribe((questions) => {
      this.userQuestions = questions.filter(
        (question) => question.auteur.id === this.userId
      );
    });
  }

  onDeleteQuestion(questionId: number) {
    this.authService.deleteQuestion(questionId).subscribe(
      () => {
        // Handle success case

        location.reload();
      },
      (error) => {
        // Handle error case
      }
    );
  }

  openDeleteConfirmation(questionId: number) {
    this.onDeleteQuestionId = questionId;
    const dialogRef = this.dialog.open(this.deleteConfirmation, {
      data: { questionId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes' && this.onDeleteQuestionId !== null) {
        this.onDeleteQuestion(this.onDeleteQuestionId);
      } else {
        this.onDeleteQuestionId = null;
      }
    });
  }
}
