import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse } from 'src/app/model/authentication-response';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-changermotpasseadmin',
  templateUrl: './changermotpasseadmin.component.html',
  styleUrls: ['./changermotpasseadmin.component.scss']
})
export class ChangermotpasseadminComponent  implements OnInit {
  successMessage!: string;
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  currentUser!: User;

  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  
  ngOnInit() {
    const authToken = localStorage.getItem('authToken');
    this.authService.getCurrentUser(authToken).subscribe((user: User) => {
      this.currentUser = user;
   
      this.getUserImage(user.id);
    });
  }

  submitChangePasswordForm(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const newPassword = this.changePasswordForm.value.newPassword;

    this.authService.changePassword(newPassword)
      .subscribe(
        (response: AuthenticationResponse) => {
          // Gérer la réponse de succès ici
          console.log('Mot de passe changé avec succès');
          this.successMessage = 'Mot de passe changé avec succès';

          setTimeout(() => {
            location.reload();
          }, 3000); // Temps d'attente de 3 secondes avant le rechargement de la page
        },
        (error: any) => {
          // Gérer l'erreur ici
          console.error('Erreur lors du changement de mot de passe', error);
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

        // Assign the image URL to the currentUser.image_url property
        this.currentUser.image_url = imageUrl;
      });
  }
}
