//Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

//Components
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { LoginComponent } from './modules/game/pages/login/login.component';
import { HomeComponent } from './modules/game/pages/home/home.component';
import { GamesComponent } from './modules/game/pages/games/games.component';
// import { GameGuard } from './modules/game/guards/game.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'newgame',
    component: NewGameComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    // canActivate: [ GameGuard ],
  },
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    // canActivate: [ GameGuard ],
  },
];

//Implementacion Rutas hijas

// const routes: Routes = [
//   {
//     path: 'login/:id',
//     canActivate: [GameGuard],
//     children: [
//       {
//         path: 'newgame',
//         component: NewGameComponent,
//       }
//     ]
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
