import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AuthenticationRequest } from '../model/authentication-request';
import { User } from '../model/user';
import { RoleEnum } from '../model/role-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router : Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  
  login(): void {
    const authenticationRequest: AuthenticationRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.loading = true; // on active le spinner
  
    this.authService.authenticate(authenticationRequest).subscribe(
      (response) => {
        this.authService.storeAuthToken(response.token);
        // rediriger vers la page suivante ici
        
        // Fetch the current user
        const authToken = this.authService.getAuthToken();
        if (authToken) {
          this.authService.getCurrentUser(authToken).subscribe(
            (user) => {
              if (user.role === 'ADMIN') {
                this.router.navigate(['/profileAdmin']);
              } else {
                this.router.navigate(['/listequestion']);
              }
              this.loading = false; // on désactive le spinner
            },
            (error) => {
              console.error(error);
              this.loading = false; // on désactive le spinner
            }
          );
        }
      },
      (error) => {
        this.error = 'Invalid email or password.';
        this.loading = false; // on désactive le spinner
      }
    );
  }
}  