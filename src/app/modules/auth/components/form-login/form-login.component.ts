import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})

export class FormLoginComponent implements OnInit {
  constructor(private authService$: AuthService) {}

  ngOnInit(): void {}

  btnLogin(): void {
    console.log('Autenticacion con google');
    this.authService$.SigninWithGoogle();
  }
}
