import {
  Component,
  OnInit,

} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reponse } from 'src/app/model/reponse';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  searchKeyword: string = '';
  filteredReponses: Reponse[] = [];

  reponses: Reponse[] = [];
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadMyReponses();
  }

  loadMyReponses() {
    this.authService.getMyReponses().subscribe(
      (reponses) => {
        this.reponses = reponses;
        this.filterReponses(); // Appliquer le filtre initial
      },
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
  filterReponses() {
    if (this.searchKeyword.trim() === '') {
      this.filteredReponses = this.reponses;
    } else {
      this.filteredReponses = this.reponses.filter((reponse) =>
        reponse.contenu.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }
  
}  
