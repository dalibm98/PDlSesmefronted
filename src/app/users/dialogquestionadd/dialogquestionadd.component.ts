import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/model/user';
import { DomaineQuestionService } from 'src/app/service/domaine-question.service';
import { NatureQuestionService } from 'src/app/service/nature-question.service';
@Component({
  selector: 'app-dialogquestionadd',
  templateUrl: './dialogquestionadd.component.html',
  styleUrls: ['./dialogquestionadd.component.scss'],
})
export class DialogquestionaddComponent implements OnInit {
  private apiUrl = 'http://localhost:8081/api/v1/auth';

  natures!: any[];
  domaines!: any[];

  addingQuestionMessage: string = '';
  showSuccessMessage: boolean = false;
  question = {
    sujet: '',
    contenu: '',
    date: null,
    auteur: null,
    reponses: [],
    nature: {id_nature_question:null}, // <-- initialiser comme un objet vide
    domaine: {id_domaine_question: null},
    isAnswered: false,
    showReponses: false,
  };
  constructor(
    private authservice: AuthenticationService,
    private http: HttpClient,
    public dialog: MatDialog,
    private domaine: DomaineQuestionService,
    private nature: NatureQuestionService
  ) {}

  ngOnInit(): void {
    this.nature.getAllNatureQuestions().subscribe((data: any[]) => {
      this.natures = data;
    });

    this.domaine.getAllDomaineQuestions().subscribe((data: any[]) => {
      this.domaines = data;
    });
  }

  addQuestion() {
  
    // Continuer avec l'ajout de la question
    const url = `${this.apiUrl}/questions`;
    const authToken = this.authservice.getAuthToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );

    this.http.post(url, this.question, { headers }).subscribe(
      (response) => {
        // Afficher le message de succès pendant 2 secondes
        setTimeout(() => {
          this.showSuccessMessage = true;
          // Recharger la page après 2 secondes
          setTimeout(() => {
            location.reload();
          }, 1500);
        }, 1500);
      },
      (error) => {
        this.addingQuestionMessage = '';
        alert("Une erreur est survenue lors de l'ajout de la question");
      }
    );
  }
}
