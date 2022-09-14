import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private httpService$: HttpClient) {}

  public createGame(body: any) {
    return this.httpService$.post('http://localhost:8080/juego/crear', {
      ...body,
    });
  }

  startGame(body: any) {
    return this.httpService$.post(`http://localhost:8080/juego/iniciar`, body);
  }

  public getGame(idGame: string) {
    return this.httpService$.get(
      `http://localhost:8080/juego/listar/${idGame}`
    );
  }

  public getAllGames() {
    return this.httpService$.get(`http://localhost:8080/juego/listar`);
  }

  public getBoard(idGame: string) {
    return this.httpService$.get(`http://localhost:8080/juego/${idGame}`);
  }

  public startRound(body: any) {
    return this.httpService$.post(
      `http://localhost:8080/juego/ronda/iniciar`,
      body
    );
  }

  public getMazo(idPlayer: string) {
    return this.httpService$.get(
      `http://localhost:8080/jugador/mazo/${idPlayer}`
    );
  }

  public putCard(body: any) {
    return this.httpService$.post(`http://localhost:8080/juego/poner`, body);
  }
}

