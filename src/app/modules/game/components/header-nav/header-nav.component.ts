import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavComponent implements OnInit {
  constructor(private authService$: AuthService) {}

  ngOnInit(): void {}

  btnLogout(): void {
    console.log('Logout: Sales del sistema');
    this.authService$.logout();
  }
}
