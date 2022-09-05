import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { LoginComponent } from './modules/game/pages/login/login.component';
import { GameGuard } from './modules/game/guards/game.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'newgame/:id',
    component: NewGameComponent,
    canActivate: [ GameGuard ],
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
