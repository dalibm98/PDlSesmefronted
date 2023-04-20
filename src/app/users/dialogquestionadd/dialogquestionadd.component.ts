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
    id_nature_question: null,
    id_domaine_question: null,
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
    // Vérifiez si la valeur de la nature est définie
    if (!this.question.id_nature_question) {
      alert('Veuillez sélectionner la nature de la question');
      return;
    }

    // Vérifiez si la valeur du domaine est définie
    if (!this.question.id_domaine_question) {
      alert('Veuillez sélectionner le domaine de la question');
      return;
    }

    // Afficher un message indiquant que la question est en train d'être ajoutée
    this.addingQuestionMessage = "La question est en train d'être ajoutée...";

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
          }, 2000);
        }, 2000);
      },
      (error) => {
        this.addingQuestionMessage = '';
        alert("Une erreur est survenue lors de l'ajout de la question");
      }
    );
  }
}
