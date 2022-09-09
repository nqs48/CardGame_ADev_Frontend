import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  title= "Card game"

  constructor() { }

  ngOnInit(): void {
  }

}
