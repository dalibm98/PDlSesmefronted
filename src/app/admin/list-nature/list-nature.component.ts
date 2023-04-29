import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NatureQuestion } from 'src/app/model/nature-question';
import { NatureQuestionService } from 'src/app/service/nature-question.service';

@Component({
  selector: 'app-list-nature',
  templateUrl: './list-nature.component.html',
  styleUrls: ['./list-nature.component.scss']
})
export class ListNatureComponent implements OnInit {
  
 
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  natureQuestions?: NatureQuestion[];
  natureQuestion: NatureQuestion = { id_nature_question: 0, nom_nature_question: '' };
  isEditing = false;
  isDialogOpen = false;
  dialogRef!: MatDialogRef<any>;
  showSuccessMessage = false;

  constructor(private natureQuestionService: NatureQuestionService, private dialog: MatDialog) { }

  
  ngOnInit() {
    this.getAllnatureQuestions();
  }

  getAllnatureQuestions() {
    this.natureQuestionService.getAllNatureQuestions().subscribe(natureQuestions => {
      this.natureQuestions = natureQuestions;
    });
  }
  openDialog() {
    this.isEditing = false;
    this.isDialogOpen = true;
    this.natureQuestion = { id_nature_question: 0, nom_nature_question: '' };
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '350px',
      height: '200px',
    });
  }
  

  createnatureQuestion(natureQuestion: NatureQuestion) {
    this.natureQuestionService.createNatureQuestion(natureQuestion).subscribe(() => {
      this.closeDialog();
      this.getAllnatureQuestions();
      this.showSuccessMessage = true;
    }, error => {
      console.log(error);
    });
  }

  updatenatureQuestion(id: number, natureQuestion: NatureQuestion) {
    this.natureQuestionService.updateNatureQuestion(id, natureQuestion).subscribe(() => {
      this.closeDialog();
      this.getAllnatureQuestions();
      this.showSuccessMessage = true;
    }, error => {
      console.log(error);
    });
  }

  deletenatureQuestion(id: number) {
    this.natureQuestionService.deleteNatureQuestion(id).subscribe(() => {
      this.getAllnatureQuestions();
      this.showSuccessMessage = true;
    }, error => {
      console.log(error);
    });
  }

  editnatureQuestion(natureQuestion: NatureQuestion) {
    this.isEditing = true;
    this.natureQuestion = natureQuestion;
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  closeDialog() {
    this.isEditing = false;
    this.isDialogOpen = false;
    this.dialogRef.close();
    this.natureQuestion = { id_nature_question: 0, nom_nature_question: '' };
  }

  onSubmit() {
    if (this.isEditing) {
      this.updatenatureQuestion(this.natureQuestion.id_nature_question, this.natureQuestion);
    } else {
      this.createnatureQuestion(this.natureQuestion);
    }
  }
}