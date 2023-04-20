import { Component, OnInit } from '@angular/core';
import { Reponse } from 'src/app/model/reponse';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit  {
  reponses!: Reponse[];
  constructor(private authService: AuthenticationService) { }




  ngOnInit(): void {
    this.loadMyReponses();
  }

  loadMyReponses() {
    this.authService.getMyReponses().subscribe(
      reponses => this.reponses = reponses,
      error => console.error(error)
    );
  }



}
