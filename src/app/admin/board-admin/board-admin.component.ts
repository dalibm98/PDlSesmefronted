import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { Chart } from 'chart.js';
import { DomaineQuestionService } from 'src/app/service/domaine-question.service';
import { NatureQuestionService } from 'src/app/service/nature-question.service';
import { DomaineQuestion } from 'src/app/model/domaine-question';
import { NatureQuestion } from 'src/app/model/nature-question';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss'],
})
export class BoardAdminComponent implements OnInit {
  @ViewChild('userStatsChart') userStatsChart!: ElementRef<HTMLCanvasElement>;
  users: User[] = [];
  domaineQuestions?: DomaineQuestion[];
  natureQuestions?: NatureQuestion[];
  nombreTotalCommentaires: number = 0;
  nombreTotalQuestions: number = 0;
  nombreTotalUsers: number = 0;
  nombreTotaldomaines: number = 0;

  nombreTotalnatures: number = 0;

  sideBarOpenn = true;

  sideBarTogglerr() {
    this.sideBarOpenn = !this.sideBarOpenn;
  }

  constructor(
    private authService: AuthenticationService,
    private userService: UserService ,
    private domaineQuestionService: DomaineQuestionService,
    private natureQuestionService: NatureQuestionService,
  ) {}

 
  ngOnInit() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
  
      for (const user of this.users) {
        this.authService.getUserStats(user.id).subscribe((stats) => {
          user.stats = {
            questionCount: stats.questionCount,
            reponseCount: stats.reponseCount,
          };
        });
      }
    });
  

    this.userService.getAllUsers().subscribe((users) => {
      this.nombreTotalUsers = users.length;
    });


    this.natureQuestionService.getAllNatureQuestions().subscribe(natureQuestions => {
      this.nombreTotaldomaines = natureQuestions.length;
    });


    this.authService.getNombreTotalCommentaires().subscribe((total) => {
      this.nombreTotalnatures = total;
    });
    this.getAllDomaineQuestions();
    this.getAllNatureQuestions();


    this.getNombreTotalCommentaires();
    this.getNombreTotalQuestions();
  }
  
  getAllNatureQuestions() {
    this.natureQuestionService.getAllNatureQuestions().subscribe(natureQuestions => {
      this.natureQuestions = natureQuestions;
    });
  }
  
  getAllDomaineQuestions() {
    this.domaineQuestionService.getAllDomaineQuestions().subscribe(domaineQuestions => {
      this.domaineQuestions = domaineQuestions;
    });
  }


  getNombreTotalCommentaires() {
    this.authService.getNombreTotalCommentaires().subscribe((total) => {
      this.nombreTotalCommentaires = total;
    });
  }

  getNombreTotalQuestions() {
    this.authService.getNombreTotalQuestions().subscribe((total) => {
      this.nombreTotalQuestions = total;
    });
  }

}  