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
import { HomeComponent } from './modules/game/pages/home/home.component';
import { GamesComponent } from './modules/game/pages/games/games.component';
import { GameboardComponent } from './modules/game/pages/gameboard/gameboard.component';
import { FormLoginComponent } from './modules/auth/components/form-login/form-login.component';
import { InitComponent } from './modules/game/pages/init/init.component';
// import { GameGuard } from './modules/game/guards/game.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    component: InitComponent,
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
  {
    path: 'gameboard',
    component: GameboardComponent,
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
