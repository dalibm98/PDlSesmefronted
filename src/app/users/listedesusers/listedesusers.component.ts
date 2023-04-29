import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-listedesusers',
  templateUrl: './listedesusers.component.html',
  styleUrls: ['./listedesusers.component.scss']
})
export class ListedesusersComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}



  
}
