import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomaineQuestion } from 'src/app/model/domaine-question';
import { DomaineQuestionService } from 'src/app/service/domaine-question.service';

@Component({
  selector: 'app-list-domaine',
  templateUrl: './list-domaine.component.html',
  styleUrls: ['./list-domaine.component.scss']
})
export class ListDomaineComponent implements OnInit {
  
 
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  domaineQuestions?: DomaineQuestion[];
  domaineQuestion: DomaineQuestion = { id_domaine_question: 0, nom_domaine_question: '' };
  isEditing = false;
  isDialogOpen = false;
  dialogRef!: MatDialogRef<any>;
  showSuccessMessage = false;
showErreurMessage = false ;
 showSuccessMessagee = false;
  constructor(private domaineQuestionService: DomaineQuestionService, private dialog: MatDialog) { }

  
  ngOnInit() {
    this.getAllDomaineQuestions();
  }

  getAllDomaineQuestions() {
    this.domaineQuestionService.getAllDomaineQuestions().subscribe(domaineQuestions => {
      this.domaineQuestions = domaineQuestions;
    });
  }
  openDialog() {
    this.isEditing = false;
    this.isDialogOpen = true;
    this.domaineQuestion = { id_domaine_question: 0, nom_domaine_question: '' };
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '350px',
      height: '200px',
    });
  }
  

  createDomaineQuestion(domaineQuestion: DomaineQuestion) {
    this.domaineQuestionService.createDomaineQuestion(domaineQuestion).subscribe(() => {
      this.closeDialog();
      this.getAllDomaineQuestions();
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }, error => {
      console.log(error);
    });
  }

  updateDomaineQuestion(id: number, domaineQuestion: DomaineQuestion) {
    this.domaineQuestionService.updateDomaineQuestion(id, domaineQuestion).subscribe(() => {
      this.closeDialog();
      this.getAllDomaineQuestions();
      this.showSuccessMessagee = true;
      setTimeout(() => {
        this.showSuccessMessagee = false;
      }, 1500);
    }, error => {
      console.log(error);
    });
  }

  deleteDomaineQuestion(id: number) {
    this.domaineQuestionService.deleteDomaineQuestion(id).subscribe(() => {
      this.getAllDomaineQuestions();
   
    }, error => {
      this.showErreurMessage = true;
      setTimeout(() => {
        this.showErreurMessage = false;
      }, 3000);
      console.log(error);
      
    });
  }

  editDomaineQuestion(domaineQuestion: DomaineQuestion) {
    this.isEditing = true;
    this.domaineQuestion = domaineQuestion;
    this.dialogRef = this.dialog.open(this.dialogTemplate);
  }

  closeDialog() {
    this.isEditing = false;
    this.isDialogOpen = false;
    this.dialogRef.close();
    this.domaineQuestion = { id_domaine_question: 0, nom_domaine_question: '' };
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateDomaineQuestion(this.domaineQuestion.id_domaine_question, this.domaineQuestion);
    } else {
      this.createDomaineQuestion(this.domaineQuestion);
    }
  }
}