import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLoginComponent implements OnInit {
  constructor(private authService$: AuthService) {}

  ngOnInit(): void {}

  btnLogin(): void {
    console.log('Autenticacion con google');
    this.authService$.SigninWithGoogle();
  }
}
