import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Card Game by ADev';

  constructor(private authService$: AuthService) {}

  ngOnInit(): void {}

  btnLogin(): void {
    console.log('Autenticacion con google');
    this.authService$.SigninWithGoogle()
  }
}
