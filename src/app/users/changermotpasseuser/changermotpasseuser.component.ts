import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse } from 'src/app/model/authentication-response';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-changermotpasseuser',
  templateUrl: './changermotpasseuser.component.html',
  styleUrls: ['./changermotpasseuser.component.scss']
})
export class ChangermotpasseuserComponent {
  successMessage!: string;


  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
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
}

