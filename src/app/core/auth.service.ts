import { inject, Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);

  constructor() {}

  async loginWithGoogle() {
    try {
      const res = await signInWithPopup(
        this.firebaseAuth,
        new GoogleAuthProvider()
      );
      return res.user;
    } catch (error) {
      console.error('Google login failed', error);
      throw error;
    }
  }

  logout() {
    return this.firebaseAuth.signOut();
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
