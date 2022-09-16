import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class GameboardComponent implements OnInit{
  gameId!: string;
  userId!: any;
  puntaje: number = 0;
  playersLog!: any;
  puntajeAcomulado:any;

  cartasDelJugador: CardModel[] = [];
  cartasDelTablero: CardModel[] = [];
  tiempo: number = 0;
  jugadoresRonda: number = 0;
  jugadoresTablero: number = 0;
  numeroRonda: number = 0;
  roundStarted: boolean = false;
  scoreGame: number= 1000;

  WinnerRound: string = '';
  WinnerGame: string = '';
  LoserRound: string = '';

  jugadoresLog: any;

  constructor(
    private websocket$: SocketService,
    private activateRoute: ActivatedRoute,
    private gameService$: GameService,
    private playerService$: PlayerService,
    private authService$: AuthService,
    private router: Router
  ) {
    this.authService$.getUserAuth().then((res) => (this.userId = res?.uid));
    this.playerService$.getAllGamers().subscribe({
      next: (data) => {
        this.playersLog = data;
        console.log('Estos son los datos: ', data);
      },
    });
  }

  ngOnInit(): void {



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
      this.gameService$
        .getMazo(this.userId, this.gameId)
        .subscribe((element: any) => {
          this.cartasDelJugador = element.cartas;
          console.log('CARTAS JUGADOR', this.cartasDelJugador);
        });

      this.websocket$.connect(this.gameId).subscribe({
        next: (event: any) => {
          console.log(event);
          if (event.type === 'cardgame.ponercartaentablero') {
            this.cartasDelTablero.push({
              cartaId: event.carta.cartaId.uuid,
              poder: event.carta.poder,
              estaOculta: event.carta.estaOculta,
              estaHabilitada: event.carta.estaHabilitada,
              uri: event.carta.url,
            });
          }
          if (event.type === 'cardgame.cartaretiradademazo') {
            this.cartasDelJugador = this.cartasDelJugador.filter(
              (item: { cartaId: any }) =>
                item.cartaId !== event.carta.cartaId.uuid
            );
          }
          // if (event.type === 'cardgame.cartaretiradademazo') {
          //   this.cartasDelJugador = this.cartasDelJugador.filter(
          //     (item) => item.cartaId !== event.carta.cartaId.uuid
          //   );
          // }
          if (event.type === 'cardgame.tiempocambiadodeltablero') {
            this.tiempo = event.tiempo;
          }
          if (event.type === 'cardgame.rondacreada') {
            this.tiempo = event.tiempo;
            this.jugadoresRonda = event.ronda.jugadores.length;
            this.numeroRonda = event.ronda.numero;
          }
          if (event.type === 'cardgame.rondainiciada') {
            this.roundStarted = true;
          }
          if (event.type === 'cargame.rondaterminada') {
            this.roundStarted = false;
            this.cartasDelTablero = [];
          }
          if (event.type === 'cardgame.cartasasignadasaganador') {
            console.log(event);
            if (event.ganadorId.uuid === this.userId) {
              event.cartasApostadas.forEach((carta: any) => {
                this.cartasDelJugador.push({
                  cartaId: carta.cartaId.uuid,
                  poder: carta.poder,
                  estaOculta: carta.estaOculta,
                  estaHabilitada: carta.estaHabilitada,
                  uri: carta.url,
                });
              });
              this.puntaje += event.puntos;
              alert('Ganaste ' + event.puntos + ' puntaje');
            } else {
              alert('Has perdido');
            }
          }
        }
          if (event.type === 'cardgame.juegofinalizado') {
            if (this.userId === event.jugadorId.uuid) {

              let player = this.playersLog.find((player: any) => player.uid === this.userId);
              console.log(player);
              player.puntaje = parseInt(player.puntaje) + this.scoreGame;
              player.puntajeCartas = parseInt(player.puntajeCartas)+ this.puntaje;
              player.puntaje.toString();
              player.puntajeCartas.toString();
              this.playerService$.addGamer(player);
            }
            this.WinnerGame = 'Ganador del juego = ' + event.alias;
            alert(`El ganador del juego es: ${event.alias}, has Obtenido ${this.scoreGame} puntos de recompensa!!`);

            this.router.navigate(['/games']);
          }
        },
        error: (err: any) => console.log(err),
        complete: () => {
          console.log('complete');
        },
      });
    });


  }

  // ngOnDestroy(): void {
  //   this.websocket$.disconnect();
  // }

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

  putCardAction(cardId: string) {
    if (this.roundStarted) {
      this.gameService$
        .putCard({
          cartaId: cardId,
          juegoId: this.gameId,
          jugadorId: this.userId,
        })
        .subscribe();
    }
  }





}
