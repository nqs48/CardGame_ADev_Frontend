import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/modules/shared/services/web-socket/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/modules/shared/services/game/game.service';
import { PlayerService } from 'src/app/modules/shared/services/player/player.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { switchMap } from 'rxjs';
import { CardModel } from '../../models/card.model';
import { MazoModel } from '../../models/mazo.model';
import { BoardModel } from '../../models/board.model';

@Component({
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  private gameId!: string;
  private userId!: any;

  mazoDelJugador!: MazoModel;
  cartasDelTablero: any;
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  numeroRonda: number = 0;
  roundStarted: boolean = false;
  puntaje: number = 0;
  isMainPlayer: boolean = false;
  currentBoard!: BoardModel;

  constructor(
    private websocket$: SocketService,
    private activateRoute: ActivatedRoute,
    private gameService$: GameService,
    private playerService$: PlayerService,
    private authService$: AuthService,
    private router: Router
  ) {
    this.authService$.getUserAuth().then((res) => (this.userId = res?.uid));
  }

  ngOnInit(): void {
    console.log('Id del usuario: ' + this.userId);

    //Traer ID del juego a traves de params
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.gameId = id;
          return this.websocket$.connect(id);
        })
      )
      .subscribe(() => {
        this.connectWebSocket();
      });

    //Traer el ID del Board
    this.gameService$.getBoard(this.gameId).subscribe({
      next: (data) => {
        console.log(data);
        if (data) {
          this.isMainPlayer = data.jugadorPrincipalId == this.userId;
          this.currentBoard = data;
        } else {
          console.log('Board not found!');
        }
      },
    });

    //Traer el mazo del jugador actual
    this.gameService$.getMazo(this.userId, this.gameId).subscribe({
      next: (res) => {
        this.mazoDelJugador = res;
        console.log('Return data mazo: ', res);
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }





  //Funcion para conectar el juegoId al web socket
  connectWebSocket() {
    this.websocket$.connect(this.gameId).subscribe({
      next: (data) => console.log('Return data subscription: ', data),
      error: (err) => console.log(err),
      complete: () => console.log('Successfully subscribed game'),
    });
  }



}
