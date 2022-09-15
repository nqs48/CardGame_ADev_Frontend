import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

import { GameService } from 'src/app/modules/shared/services/game/game.service';
import { SocketService } from 'src/app/modules/shared/services/web-socket/socket.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: any;
  actualPlayer: any;

  constructor(
    private router$: Router,
    private gameService$: GameService,
    private socketService$: SocketService,
    private authService$: AuthService
  ) {
    this.authService$.getUserAuth().then((res) => (this.actualPlayer = res?.uid));
  }

  ngOnInit(): void {
    this.gameService$.getAllGames().subscribe({
      next: (data) => {
        console.log('Return data games--: ', data);
        this.games = data;
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  goBoard(gameId: string) {
    this.gameService$.startGame({ juegoId: gameId }).subscribe({
      next: (data) => {
        console.log('Return data star Game: ', data);
        console.log('Game started successfully!!!');
        
        this.socketService$.connect(gameId).subscribe({
          next: (data) => {
            console.log('Return socket subscription (gameId): ', data);
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log('complete');
        this.router$.navigate([`/gameboard/${gameId}`]);
      },
    });
  }
}
