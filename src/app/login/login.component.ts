import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AuthenticationRequest } from '../model/authentication-request';

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
    private authService: AuthenticationService
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
        this.loading = false; // on désactive le spinner
      },
      (error) => {
        this.error = 'Invalid email or password.';
        this.loading = false; // on désactive le spinner
      }
    );
  }
}
