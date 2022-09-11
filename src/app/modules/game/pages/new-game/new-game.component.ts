//Imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 } from 'uuid';

//Models
import { JugadorModel } from '../../models/jugador.model';

//Services
import { CreateGameService } from 'src/app/modules/shared/services/createGame.service';
import { GamerService } from 'src/app/modules/shared/services/gamer/gamer.service';
import { SocketService } from 'src/app/modules/shared/services/web-socket/socket.service';
import { JugadoresFakeService } from '../../services/jugadores-fake.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})

export class NewGameComponent implements OnInit, OnDestroy {

  uuid!: string;
  frmJugadores: FormGroup;
  jugadoresFake?: JugadorModel[];

  constructor(
    private jugadores$: JugadoresFakeService,
    private gamerService$: GamerService,
    private router: Router,
    private createGameService$: CreateGameService,
    private websocketService$: SocketService
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

  goBoard(): void {
    // this.router.navigate(['/games']);
    this.createGameService$
      .createGame({
        juegoId: this.uuid,
        jugadores: {
          'uid-001': 'Nestea',
          'uid-002': 'Andy',
        },
        jugadorPrincipalId: 'uid-001',
      })
      .subscribe({
        next: (data) => console.log('Return data subscription: ', data),
        error: (err) => console.log(err),
        complete: () => console.log('complete'),
      });
  }


}
