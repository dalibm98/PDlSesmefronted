
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-accountusers',
  templateUrl: './accountusers.component.html',
  styleUrls: ['./accountusers.component.scss']
})
export class AccountusersComponent  implements OnInit{
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  currentUser!: User;

  modifiedUser: User = { 
    id : 0,// create a new object to store modified user info
    firstname: '',
    lastname: '',
    adresse: '',
    description: '',
    status: '',
  
  };
  showSuccessMessage: boolean = false;
  modifiedUserr: User = { 
    id : 0,// create a new object to store modified user info
    firstname: '',
    lastname: '',
    adresse: '',
    description: '',
    status: '',
   
  };


  constructor(private authService: AuthenticationService ,     private http: HttpClient,) { }


  ngOnInit() {
    const authToken = localStorage.getItem('authToken');
    this.authService.getCurrentUser(authToken).subscribe((user: User) => {
      this.currentUser = user;
      this.modifiedUserr = {...user}; 
    });
  }
  

  onUpdateProfile() {
    const authToken = this.authService.getAuthToken();
    if (!authToken) {
      // Gérer le cas où le jeton d'authentification est nul ou indéfini
      return;
    }
  
    const url = `${this.apiUrl}/users/${this.currentUser.id}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );
    this.http.put<User>(url, this.modifiedUser, { headers })
      .subscribe((updatedUser: User) => {
        this.currentUser = updatedUser;
        this.modifiedUser = {...updatedUser};
  
        setTimeout(() => {
          this.showSuccessMessage = true;
          // Recharger la page après 2 secondes
          setTimeout(() => {
            location.reload();
          }, 2000);
        }, 2000);
      }, () => {
        console.log('User updated successfully');
      });
  }
  
}