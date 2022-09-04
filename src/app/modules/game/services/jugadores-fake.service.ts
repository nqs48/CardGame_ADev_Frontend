import { Injectable } from '@angular/core';
import { JugadorModel } from '../models/jugador.model';

@Injectable({
  providedIn: 'root'
})


export class JugadoresFakeService {

  constructor() { }

  getJugadores(): JugadorModel[] {

    let jugador01: JugadorModel = {
      id: "1",
      name: "Nestea Qs"
    };

    let jugador02: JugadorModel = {
      id: "2",
      name: "Noah Alek"
    };

    let jugador03: JugadorModel = {
      id: '3',
      name: 'James Pickford',
    };

    let jugador04: JugadorModel = {
      id: '4',
      name: 'Harry Styles',
    };

    return [jugador01, jugador02, jugador03, jugador04];
  }
}
