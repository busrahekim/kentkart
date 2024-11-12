import { AuthService } from './../../core/auth.service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);

  /**
   *
   */
  constructor(private authService: AuthService) {}

  async onGoogleLogin() {
    try {
      const userCredential = await this.authService.loginWithGoogle();
      console.log('Logged user: ', userCredential);

      const isAuth = await this.authService.isAuthenticated().toPromise();
      console.log('Is user authenticated? ', isAuth);
    } catch (error) {
      console.log('Login error: ', error);
    }
  }
}
