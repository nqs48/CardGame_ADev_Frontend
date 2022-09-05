import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { JugadoresFakeService } from '../../game/services/jugadores-fake.service';
import { GoogleModel } from '../models/google.model';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private afAuth: AngularFireAuth,
    private gamers$: JugadoresFakeService
  ) {}

  logout(): void {
    this.afAuth.signOut().then((_res) => {
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    });
  }

  async getUserAuth() {
    const userData = await this.afAuth.currentUser;
    return userData;
  }

  SigninWithGoogle(): Promise<void> {
    return this.OAuthProvider(new GoogleAuthProvider())
      .then((res) => {
        console.log('Successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private OAuthProvider(provider: AuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res.user?.getIdToken().then(console.log));
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
