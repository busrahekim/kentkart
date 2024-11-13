import { inject, Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);

  router = inject(Router);

  constructor() {}

  async loginWithGoogle() {
    try {
      const res = await signInWithPopup(
        this.firebaseAuth,
        new GoogleAuthProvider()
      );
      const currentUser = res.user;
      if (currentUser) {
        this.router.navigate(['/employees/edit']);
      }
      return currentUser;
    } catch (error) {
      console.error('Google login failed', error);
      throw error;
    }
  }

  logout() {
    return this.firebaseAuth.signOut().then(() => {
      this.router.navigate(['/employees']);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const unsubscribe = this.firebaseAuth.onAuthStateChanged((user) => {
        observer.next(!!user);
      });
      return { unsubscribe };
    });
  }
}
