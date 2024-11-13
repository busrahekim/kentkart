import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  async onGoogleLogin() {
    try {
      await this.authService.loginWithGoogle();
      this.closeModal();
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  closeModal() {  
    this.close.emit();
  }
}
