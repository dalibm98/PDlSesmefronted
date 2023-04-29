import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { ListedesusersComponent } from '../listedesusers/listedesusers.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usr',
  templateUrl: './usr.component.html',
  styleUrls: ['./usr.component.scss'],
})
export class UsrComponent {
  users: User[] = [];
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;

      for (const user of this.users) {
        this.authService.getUserStats(user.id).subscribe((stats) => {
          user.stats = {
            questionCount: stats.questionCount,
            reponseCount: stats.reponseCount,
          };
        });

        this.getUserImage(user.id);
      }
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

        // Update the user object with the image URL
        const user = this.users.find((u) => u.id === userId);
        if (user) {
          user.image_url = imageUrl;
        }
      });
  }
  openUserDialog(user: User): void {
    const dialogRef = this.dialog.open(ListedesusersComponent, {
      data: user
    });
  }
}
