import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Card Game by ADev';

  constructor() { }

  ngOnInit(): void {}

  btnLogin(): void{

    console.log("Autenticacion con google")

  }




}
