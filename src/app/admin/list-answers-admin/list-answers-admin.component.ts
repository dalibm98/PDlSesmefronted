import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reponse } from 'src/app/model/reponse';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-list-answers-admin',
  templateUrl: './list-answers-admin.component.html',
  styleUrls: ['./list-answers-admin.component.scss']
})
export class ListAnswersAdminComponent 
implements OnInit {
  reponses: Reponse[] = [];

  sideBarOpenn = true;

  sideBarTogglerr() {
    this.sideBarOpenn = !this.sideBarOpenn;
  }
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
  ) {}

  ngOnInit(): void {
    this.loadAllReponses();
  }

  loadAllReponses() {
    this.questionService.consulterToutesReponses().subscribe(
      (reponses) => (this.reponses = reponses),
      (error) => console.error(error)
    );
  }

  deleteReponse(reponseId: number) {
    const reponseToDelete = this.reponses.find((r) => r.id_reponse === reponseId);
    if (reponseToDelete) {
      const questionId = reponseToDelete.question.id_question;
      this.authService.deleteAnswer(questionId, reponseId).subscribe(
        () => {
          // Supprime la réponse du tableau
          this.reponses = this.reponses.filter((r) => r !== reponseToDelete);
          alert('Response deleted successfully');
        },
        (error) =>
          console.error(
            `Failed to delete response ${reponseId} from question ${questionId}: ${error}`
          )
      );
    }
  }
}