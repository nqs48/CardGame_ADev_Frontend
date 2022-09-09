import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  startGame() {
    this.router.navigate(['/gameboard']);
  }
}
