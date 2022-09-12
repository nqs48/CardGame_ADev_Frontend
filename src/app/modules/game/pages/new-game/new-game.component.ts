//Imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 } from 'uuid';

//Models
import { JugadorModel } from '../../models/jugador.model';

//Services
import { GameService } from 'src/app/modules/shared/services/game/game.service';
import { PlayerService } from 'src/app/modules/shared/services/player/player.service';
import { SocketService } from 'src/app/modules/shared/services/web-socket/socket.service';
import { JugadoresFakeService } from '../../services/jugadores-fake.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  template: `<app-new-game [uuid]="uidGame"></app-new-game>`,
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit, OnDestroy {
  uuid!: string;
  frmJugadores: FormGroup;
  jugadoresFake?: JugadorModel[];
  jugadores?: JugadorModel[];
  actualPlayer!: string;

  constructor(
    private jugadores$: JugadoresFakeService,
    private gamerService$: PlayerService,
    private router: Router,
    private gameService$: GameService,
    private websocketService$: SocketService,
    private authService$: AuthService
  ) {
    this.frmJugadores = this.createFormJugadores();
    this.uuid = v4();
  }

  ngOnInit(): void {
    this.websocketService$.connect(this.uuid).subscribe({
      next: (data) => console.log('Return data subscription: ', data),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
    this.gamerService$.getAllGamers().subscribe({
      next: (data) => {
        this.jugadoresFake = data;
        console.log("Estos son los datos: ",data)
      },
    });
  }

  ngOnDestroy(): void {
    this.websocketService$.disconnect();
  }

  private createFormJugadores(): FormGroup {
    return new FormGroup({
      jugadores: new FormControl(null, [Validators.required]),
    });
  }

  public submitJugadores() {
    console.log('Submit: ', this.frmJugadores.getRawValue());
  }

  crearGame() {
    this.gameService$
      .createGame({
        juegoId: this.uuid,
        jugadores: this.getPlayers(),
        jugadorPrincipalId: "Nestor Quiroga",
      })
      .subscribe({
        next: (data) => console.log('Return data subscription: ', data),
        error: (err) => console.log(err),
        complete: () => {
          console.log('complete');
          this.router.navigate(['/games']);
        },

      });

  }

  goBoard(): void {
    this.crearGame()

  }

  getPlayers() {
    let a=this.jugadoresFake?.reduce(
      (previous, current) => ({
        ...previous,
        [current.uid!]: current.name,
      }),
      {}
    );
    console.log('Formulario de Jugadores generado: ', a)
    return a;
  }


}
