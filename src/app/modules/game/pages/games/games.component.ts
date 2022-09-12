import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/modules/shared/services/game/game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {

  games: any ;

  constructor(
    private router: Router,
    private gameService$: GameService,
    ) {}

  ngOnInit(): void {

    this.gameService$.getAllGames().subscribe({
      next: (data) => {
        console.log('Return data games: ', data)
        this.games=data;

      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),

    });

  }

  startGame() {
    this.router.navigate(['/gameboard']);
  }
}
