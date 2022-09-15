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
  jugadoresRonda!: number;
  jugadoresTablero!: number;
  numeroRonda!: number;
  roundStarted: boolean = false;
  puntaje: number = 0;
  isMainPlayer: boolean = false;
  ganadorRonda: string = '';
  ganadorJuego: string = '';

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
    this.activateRoute.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('ID DEL JUEGO = ', this.gameId);

      //Traer el ID del Board
      this.gameService$.getBoard(this.gameId).subscribe((element: any) => {
        console.log('TABLERO = ', element);
        this.cartasDelTablero = Object.entries(element.tablero.cartas).flatMap(
          (a: any) => {
            return a[1];
          }
        );
        console.log('CARTAS DEL TABLERO =', this.cartasDelTablero);
        this.tiempo = element.tiempo;
        this.jugadoresRonda = element.ronda.jugadores.length;
        this.jugadoresTablero = element.tablero.jugadores.length;
        this.numeroRonda = element.ronda.numero;
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

      this.websocket$.connect(this.gameId).subscribe({
        next: (event: any) => {
          console.log(event);
          if (event.type === 'cardgame.tiempocambiadodeltablero') {
            this.tiempo = event.tiempo;
          }
          if (event.type === 'cardgame.rondacreada') {
            this.numeroRonda = event.ronda.numero;
          }
          if (event.type === 'cardgame.rondainiciada') {
            this.roundStarted = true;
          }
          if (event.type === 'cargame.rondaterminada') {
            this.roundStarted = false;
          }
          if (event.type === 'cardgame.cartasasignadasajugador') {
            this.ganadorRonda =
              'Ganador de la ronda # ' +
              this.numeroRonda +
              '=' +
              event.ganadorId.uuid;
          }
          if (event.type === 'cardgame.juegofinalizado') {
            this.ganadorJuego = 'Ganador del juego = ' + event.alias;
          }
        },
        error: (err: any) => console.log(err),
        complete: () => {this.websocket$.disconnect();}
      });
    });
  }

  //Funcion para conectar el juegoId al web socket
  // connectWebSocket() {
  //   this.websocket$.connect(this.gameId).subscribe({
  //     next: (data) => console.log('Return data subscription: ', data),
  //     error: (err) => console.log(err),
  //     complete: () => console.log('Successfully subscribed game'),
  //   });
  // }

  startRound() {
    this.gameService$
      .startRound({
        juegoId: this.gameId,
      })
      .subscribe();
  }

  putCard(cardId: string) {
    this.gameService$
      .putCard({
        cardId: cardId,
        juegoId: this.gameId,
        jugadorId: this.userId,
      })
      .subscribe();
  }

  disconnectRound(){
    this.websocket$.disconnect();
  };
}
