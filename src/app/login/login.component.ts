import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  login(): void {
    // Code to handle login logic
    // Assuming login is successful, navigate to home page
    this.router.navigate(['/home']);
  }
}
