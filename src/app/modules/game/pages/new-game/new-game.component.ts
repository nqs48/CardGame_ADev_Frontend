//Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUserService } from 'src/app/modules/shared/services/createUser.service';

//Models
import { JugadorModel } from '../../models/jugador.model';

//Services
import { JugadoresFakeService } from '../../services/jugadores-fake.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit {
  frmJugadores: FormGroup;
  jugadoresFake?: JugadorModel[];

  constructor(
    private jugadores$: JugadoresFakeService,
    private createUserService$: CreateUserService
    ) {
    this.frmJugadores = this.createFormJugadores();
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }

  public submitJugadores() {
    console.log('Submit: ', this.frmJugadores.getRawValue());
  }

  // btnLogout():void{
  //   console.log('Logout: Sales del sistema')
  //   this.authService$.logout();

  // }

  ngOnInit(): void {
    // this.jugadoresFake = this.jugadores$.getJugadores();
    // console.log(this.jugadoresFake);
    this.createUserService$.getAllUser().subscribe({next: (data)=>{this.jugadoresFake = data; console.log(data)}});
    }

}
