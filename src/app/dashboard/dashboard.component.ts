import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Question } from '../model/question';
import { QuestionService } from '../service/question.service';
import { User } from '../model/user';
import { Reponse } from '../model/reponse';
import { DialogElementsExampleDialogComponent } from '../dialog-elements-example-dialog/dialog-elements-example-dialog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  questions: Question[] = [];
  reponses : Reponse [] = [] ; 
  selectedQuestion: Question | undefined;
  @ViewChild('dialogContentTemplate') dialogContentTemplate!: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    private questionService: QuestionService
  ) {}
  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.consulterQuestions().subscribe(
      (questions) => {
        this.questions = questions;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog(question: Question): void {
    this.questionService.consulterReponses(question.id_question).subscribe(
      (reponses) => {
        question.reponses = reponses;
        this.selectedQuestion = question;
        this.dialog.open(this.dialogContentTemplate, {
          width: '1000px',
          height: '500px',
          data: this.selectedQuestion,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  
  getFirstName(user: User): string {
    return user?.firstname || '';
  }



  openDialogg(): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialogComponent, {
      width: '700px',
      height: '250px',
    });
  }
  
}