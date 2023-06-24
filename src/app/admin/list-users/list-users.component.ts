import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { ListedesusersComponent } from 'src/app/users/listedesusers/listedesusers.component';
interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  user: User = {
    id: 0,
    firstname: '',
    lastname: '',
    adresse: '',
    status: '',
    description: '',
    email: '',
    password: '',
    image_url: '',
  };
  dialogRef!: MatDialogRef<any>;
  showSuccessMessage: boolean = false;

  sideBarOpenn = true;

  sideBarTogglerr() {
    this.sideBarOpenn = !this.sideBarOpenn;
  }

  private apiUrl = 'http://localhost:8081/api/v1/auth';
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
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

onSubmit(userForm: NgForm): void {
  if(userForm.invalid) {
    return;
  }

    const user: RegisterRequest = {
      lastname: this.user.lastname!,
      firstname: this.user.firstname!,
      email: this.user.email!,
      password: this.user.password!,
    };
    this.authService.addNewUser(user).subscribe(
      () => {
        // Reload the user list
        this.userService.getAllUsers().subscribe((users) => {
          this.users = users;
        });

        // Close the dialog
        this.dialog.closeAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  openDialog(): void {
    this.dialog.open(this.dialogTemplate, {
    });
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        // Si la suppression réussit, supprimez l'utilisateur de la liste des utilisateurs
        this.users = this.users.filter((user) => user.id !== id);
      },
      (error) => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
        console.error(error);
        
      }
    );
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
}
