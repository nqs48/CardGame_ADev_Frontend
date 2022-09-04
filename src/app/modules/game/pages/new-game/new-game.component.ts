//Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private jugadores$: JugadoresFakeService ) {
    this.frmJugadores = this.createFormJugadores();
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }

  public submitJugadores(){
    console.log("Submit: " ,this.frmJugadores.getRawValue());
  };



  ngOnInit(): void {

    this.jugadoresFake = this.jugadores$.getJugadores();
    console.log(this.jugadoresFake);


  }
}
