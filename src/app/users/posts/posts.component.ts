import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { Reponse } from 'src/app/model/reponse';
import { User } from 'src/app/model/user';
import { QuestionService } from 'src/app/service/question.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogquestionaddComponent } from '../dialogquestionadd/dialogquestionadd.component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  userImageUrls: { [userId: number]: string } = {};
  currentUser!: User;
  questions: Question[] = [];
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  users: User[] = [];


  searchDomain: string = '';
searchNature: string = '';
searchAuthor: string = '';
searchSujet : string ='';
filteredQuestions: Question[] = [];

  constructor(
    private questionService: QuestionService,
    private authservice: AuthenticationService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.questionService.consulterQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.filteredQuestions = questions;
        const userIds = this.questions.map((question) => question.auteur.id);
        const observables = userIds.map((userId) => this.getUserImage(userId));

        forkJoin(observables).subscribe();
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
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );
    const dateCreation = new Date(Date.now());
    const requestBody = {
      contenu: responseContent,
      dateCreation: dateCreation,
    };

    return this.http.post(url, requestBody, { headers }).subscribe(
      (response) => {
        // refresh the list of answers for the current question
        const questionIndex = this.questions.findIndex(
          (q) => q.id_question === questionId
        );
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
  getUserImage(userId: number) {
    const authToken = this.authservice.getAuthToken();
    if (!authToken) {
      return;
    }

    const url = `${this.apiUrl}/users/${userId}/image`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );

    this.http
      .get(url, { headers, responseType: 'blob' })
      .subscribe((imageData: Blob) => {
        // Create a blob URL for the image
        const imageUrl = URL.createObjectURL(imageData);

        // Find the author of the question and assign the image URL to their image_url property
        const author = this.questions.find(
          (question) => question.auteur.id === userId
        )?.auteur;
        if (author) {
          author.image_url = imageUrl;
        }
      });
  }
  voteForReponse(reponseId: number) {
    const url = `${this.apiUrl}/${reponseId}/vote`;
    const authToken = this.authservice.getAuthToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );

    this.http.put(url, null, { headers }).subscribe(
      () => {
        // Vote réussi, mettez à jour le nombre de votes localement
        const reponse = this.questions
          .flatMap((q) => q.reponses)
          .find((r) => r.id_reponse === reponseId);
        if (reponse) {
          if (!isNaN(reponse.votes)) {
            reponse.votes++;
          } else {
            reponse.votes = 1;
          }
          reponse.isVoted = true; // Définir isVoted sur true
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getMeilleuresReponsesTrieParVotes() {


    this.authservice.getMeilleuresReponsesTrieParVotes().subscribe(
      (reponses) => {
        this.questions.forEach((question) => {
          // Find the corresponding question object in 'questions'
          
          const foundQuestion = this.questions.find((q) => q.id_question === question.id_question);
          console.log(foundQuestion)
          if (foundQuestion) {
            // Sort the reponses array of the found question
            console.log(foundQuestion.reponses)
            foundQuestion.reponses.sort((a, b) => b.vote_utilisateur.length - a.vote_utilisateur.length);
          }
        });
        this.refreshQuestionsList(); // Update the questions list
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refreshQuestionsList() {
    this.questionService.consulterQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        this.filteredQuestions = questions;
        const userIds = this.questions.map((question) => question.auteur.id);
        const observables = userIds.map((userId) => this.getUserImage(userId));
        forkJoin(observables).subscribe();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchQuestions() {
    // Filter questions based on the search criteria
    this.filteredQuestions = this.questions.filter((question) => {
      const isDomainMatch = question.domaine.nom_domaine_question.toLowerCase().includes(this.searchDomain.toLowerCase());
      const isNatureMatch = question.nature.nom_nature_question.toLowerCase().includes(this.searchNature.toLowerCase());
      const isAuthorMatch = question.auteur.firstname.toLowerCase().includes(this.searchAuthor.toLowerCase());
      const searchSujet = question.sujet.toLowerCase().includes(this.searchSujet.toLowerCase());
      return isDomainMatch && isNatureMatch && isAuthorMatch && searchSujet;
    });
  }
}
