import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DomaineQuestionService } from 'src/app/service/domaine-question.service';
import { NatureQuestionService } from 'src/app/service/nature-question.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-list-post-admin',
  templateUrl: './list-post-admin.component.html',
  styleUrls: ['./list-post-admin.component.scss'],
})
export class ListPostAdminComponent implements OnInit {
  questions: Question[] = [];
  userId!: number;
  userQuestions: Question[] = [];
  questionId!: number;
  natures!: any[];
  domaines!: any[];
  onEditquestionId: number | null = null;
  //formData :  Question[] = [];
  editForm!: FormGroup;
  formData = {
    sujet: '',
    contenu: '',
    domaine: null,
    nature: null,
  };
  question = {
    sujet: '',
    contenu: '',
    date: null,
    auteur: null,
    reponses: [],
    nature: { id_nature_question: null }, // <-- initialiser comme un objet vide
    domaine: { id_domaine_question: null },
    isAnswered: false,
    showReponses: false,
  };
  showSuccessMessage: boolean = false;
  private apiUrl = 'http://localhost:8081/api/v1/auth';

  @ViewChild('deleteConfirmation') deleteConfirmation!: TemplateRef<any>; // define deleteConfirmation as a property

  onDeleteQuestionId: number | null = null;
  constructor(
    private authService: AuthenticationService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private domaine: DomaineQuestionService,
    private nature: NatureQuestionService
  ) {}

  ngOnInit() {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      const user$ = this.authService.getCurrentUser(authToken);

      this.loadQuestions();

      this.nature.getAllNatureQuestions().subscribe((data: any[]) => {
        this.natures = data;
      });

      this.domaine.getAllDomaineQuestions().subscribe((data: any[]) => {
        this.domaines = data;
      });
    }
  }

  loadQuestions() {
    const questions$ = this.questionService.consulterQuestions();
    questions$.subscribe((questions) => {
      this.questions = questions;
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
