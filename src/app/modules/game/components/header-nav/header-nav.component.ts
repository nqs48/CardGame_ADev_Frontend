import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavComponent implements OnInit {
  constructor(
    private authService$: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  btnLogout(): void {
    console.log('Logout: Sales del sistema');
    this.authService$.logout();
  }

  btnGames(): void {
    this.router.navigate(['/games']);
  }

  btnIndex(): void{
    this.router.navigate(['/home']);
  }
}
