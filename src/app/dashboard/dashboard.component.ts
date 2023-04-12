import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Question } from '../model/question';
import { QuestionService } from '../service/question.service';
import { User } from '../model/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  questions: Question[] = [];

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

  openDialog(): void {
    this.dialog.open(this.dialogContentTemplate, {
      width: '1000px',
      height: '500px',
    });
  }
  getFirstName(user: User): string {
    return user?.firstname || '';
  }

}
