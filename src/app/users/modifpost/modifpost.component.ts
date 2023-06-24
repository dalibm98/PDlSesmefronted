import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Question } from 'src/app/model/question';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DomaineQuestionService } from 'src/app/service/domaine-question.service';
import { NatureQuestionService } from 'src/app/service/nature-question.service';
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

  searchKeyword: string = '';
  filteredQuestions: Question[] = [];

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
  @ViewChild('editDialog') editDialog!: TemplateRef<any>; // define deleteConfirmation as a property

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
      user$.subscribe((user) => {
        this.userId = user.id;
        this.loadQuestions();
      });

      this.nature.getAllNatureQuestions().subscribe((data: any[]) => {
        this.natures = data;
      });

      this.domaine.getAllDomaineQuestions().subscribe((data: any[]) => {
        this.domaines = data;
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
      this.filterQuestions(); // Appliquer le filtre initial
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
  filterQuestions() {
    if (this.searchKeyword.trim() === '') {
      this.filteredQuestions = this.userQuestions;
    } else {
      this.filteredQuestions = this.userQuestions.filter((question) =>
        question.domaine.nom_domaine_question.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        question.nature.nom_nature_question.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
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

  modifyQuestion(questionId: number, question: any): Observable<any> {
    const url = `${this.apiUrl}/questions/${questionId}`;
    const authToken = this.authService.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };

    return this.http.put(url, question, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateQuestion(questionId: number, formData: any) {
    const updatedQuestion = Object.assign({}, formData, {
      domaine: {
        id_domaine_question: formData.domaine,
      },
      nature: {
        id_nature_question: formData.nature,
      },
    });

    this.modifyQuestion(questionId, updatedQuestion).subscribe((result) => {
      console.log(result);

      // Display success message and reload page
      setTimeout(() => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          location.reload();
        }, 1500);
      }, 1500);
    });

    const question = this.userQuestions.find(
      (q) => q.id_question === questionId
    );
    if (question) {
      Object.assign(question, formData, {
        domaine: {
          id_domaine_question: formData.domaine,
        },
        nature: {
          id_nature_question: formData.nature,
        },
      });
    }
  }

  openEditDialog(questionId: number): void {
    const question = this.userQuestions.find(
      (q) => q.id_question === questionId
    );
    const dialogRef = this.dialog.open(this.editDialog, {
      width: '650px',
      height: '650px',
      data: { questionId, question },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes' && this.onEditquestionId !== null) {
        this.onDeleteQuestion(this.onEditquestionId);
      } else if (result === 'no') {
        this.onEditquestionId = null;
      }
    });
  }
}
