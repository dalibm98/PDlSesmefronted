import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,EventEmitter , OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Notif } from 'src/app/model/notif';
import { RoleEnum } from 'src/app/model/role-enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.scss']
})
export class HeaderuserComponent  implements OnInit{
  notifications  : Notif [] = []
  currentUser: User | null = null;
  currentUserr!: User;

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  private apiUrl = 'http://localhost:8081/api/v1/auth';
  constructor(private router: Router , private authService: AuthenticationService , private http: HttpClient) {}

  ngOnInit(): void {
    const authToken = this.authService.getAuthToken();
    if (authToken) {
      this.authService.getCurrentUser(authToken).subscribe(user => {
        this.currentUser = user;
        this.getUserImage(user.id);
      });
    }

     this.authService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }


  logout(): void {
    this.authService.removeAuthToken(); // supprime le token d'authentification du local storage
    this.currentUser = null; // réinitialise l'utilisateur actuel
    this.router.navigate(['/auth']); // redirige vers la page de connexion
  }
  
    markAsRead(notificationId: number): void {
      this.authService.markNotificationAsRead(notificationId).subscribe((notification) => {
        // Mettre à jour la liste des notifications en supprimant la notification marquée comme lue
        this.notifications = this.notifications.filter(notif => notif.id_notification !== notificationId);
      });
  } 

  getUserImage(userId: number) {
    const authToken = this.authService.getAuthToken();
    if (!authToken) {
      return;
    }

    const url = `${this.apiUrl}/users/${userId}/image`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${authToken}`
    );

    this.http
      .get(url, { headers, responseType: 'blob' })
      .subscribe((imageData: Blob) => {
        // Create a blob URL for the image
        const imageUrl = URL.createObjectURL(imageData);

        // Assign the image URL to the currentUser.image_url property
        this.currentUserr.image_url = imageUrl;
      });
  }
}




