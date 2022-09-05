import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  btnNewGame(): void {
    this.router.navigate(['/newgame']);
  }

  btnHistory(): void {
    this.router.navigate(['/games']);
  }
}
