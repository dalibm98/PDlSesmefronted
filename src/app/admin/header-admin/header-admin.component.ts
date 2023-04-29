import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit{

  currentUser: User | null = null;

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router , private authService: AuthenticationService) {}

  ngOnInit(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      this.authService.getCurrentUser(authToken).subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }


  logout(): void {
    this.authService.removeAuthToken(); // supprime le token d'authentification du local storage
    this.currentUser = null; // réinitialise l'utilisateur actuel
    this.router.navigate(['/auth']); // redirige vers la page de connexion
  }
  

}
