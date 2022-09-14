import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/modules/shared/services/web-socket/socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/modules/shared/services/game/game.service';
import { PlayerService } from 'src/app/modules/shared/services/player/player.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  private gameId!: string;
  private userId!: any;

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
    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.gameId = id;
          return this.websocket$.connect(id);
        })
      )
      .subscribe(() => {
        this.connectWebSocket();
        console.log(this.gameId);
      });

    this.gameService$.getBoard(this.gameId).subscribe({
      next: (data) => {
        console.log('Return data board: ', data);
      },
    });

    this.gameService$.getMazo(this.userId).subscribe({
      next: (data) => {
        console.log('Return data mazo: ', data);
      },
    });

    console.log('Id del usuario: ' + this.userId);
    console.log('ID del Juego: ', this.gameId);
  }

  connectWebSocket() {
    this.websocket$.connect(this.gameId).subscribe({
      next: (data) => console.log('Return data subscription: ', data),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
