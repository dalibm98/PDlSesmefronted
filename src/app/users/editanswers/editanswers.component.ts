import { Component } from '@angular/core';

@Component({
  selector: 'app-editanswers',
  templateUrl: './editanswers.component.html',
  styleUrls: ['./editanswers.component.scss']
})
export class EditanswersComponent {
  currentUser: string = 'Moi';
  selectedUser: string | null = null;

  messages: { [key: string]: { user: string, text: string }[] } = {
    'Toi': [
      { user: 'Toi', text: 'Bonjour, comment vas-tu ?' },
      { user: 'Moi', text: 'Je vais bien, merci. Et toi ?' },
      { user: 'Toi', text: 'Je vais bien aussi, merci.' }
    ],
    'Autre utilisateur': [
      { user: 'Autre utilisateur', text: 'Salut !' },
      { user: 'Moi', text: 'Bonjour !' }
    ]
  };
  
  users: string[] = Object.keys(this.messages);

  selectUser(user: string) {
    this.selectedUser = user;
  }
}

