//Libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

//Environments
import { environment } from 'src/environments/environment';


//Routers
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './templates/cards/app.component';

//Components
import { NewGameComponent } from './modules/game/pages/new-game/new-game.component';
import { ComponentsModule } from './modules/game/components/components.module';
import { HomeComponent } from './modules/game/pages/home/home.component';
import { GamesComponent } from './modules/game/pages/games/games.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { GameboardComponent } from './modules/game/pages/gameboard/gameboard.component';
import { AuthModule } from './modules/auth/auth.module';
import { FormLoginComponent } from './modules/auth/components/form-login/form-login.component';
import { InitComponent } from './modules/game/pages/init/init.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NewGameComponent,
    HomeComponent,
    GamesComponent,
    GameboardComponent,
    InitComponent,
  ],
  imports: [
    AuthModule,
    HttpClientModule,
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
