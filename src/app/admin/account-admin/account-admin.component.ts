import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.scss']
})
export class AccountAdminComponent 
 implements OnInit {
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  currentUser!: User;

  modifiedUser: User = {
    id: 0, // create a new object to store modified user info
    firstname: '',
    lastname: '',
    adresse: '',
    description: '',
    status: '',
    image_url: '',
  };



  sideBarOpenn = true;

  sideBarTogglerr() {
    this.sideBarOpenn = !this.sideBarOpenn;
  }
  showSuccessMessage: boolean = false;
  modifiedUserr: User = {
    id: 0, // create a new object to store modified user info
    firstname: '',
    lastname: '',
    adresse: '',
    description: '',
    status: '',
    image_url: '',
  };

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const authToken = localStorage.getItem('authToken');
    this.authService.getCurrentUser(authToken).subscribe((user: User) => {
      this.currentUser = user;
      this.modifiedUserr = { ...user };
      this.getUserImage(user.id);
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

    // Créer un objet FormData pour inclure le fichier image_url
    const formData = new FormData();
    formData.append('image_url', this.modifiedUser.image_url);

    // Ajouter les autres propriétés de l'utilisateur à FormData
    formData.append('firstname', this.modifiedUser.firstname);
    formData.append('lastname', this.modifiedUser.lastname);
    formData.append('adresse', this.modifiedUser.adresse);
    formData.append('description', this.modifiedUser.description);
    formData.append('status', this.modifiedUser.status);

    this.http.put<User>(url, formData, { headers }).subscribe(
      (updatedUser: User) => {
        this.currentUser = updatedUser;
        this.modifiedUser = { ...updatedUser };

        setTimeout(() => {
          this.showSuccessMessage = true;
          // Recharger la page après 2 secondes
          setTimeout(() => {
            location.reload();
          }, 2000);
        }, 2000);
      },
      () => {
        console.log('User updated successfully');
      }
    );
  }

  onFileChange(event: any) {
    // Récupérer le fichier image_url sélectionné par l'utilisateur
    const file = event.target.files[0];

    // Assigner le fichier à la propriété image_url de modifiedUser
    this.modifiedUser.image_url = file;
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
