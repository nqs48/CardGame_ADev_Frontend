import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { MazoModel } from 'src/app/modules/game/models/mazo.model';
import { BoardModel } from 'src/app/modules/game/models/board.model';
import { PutCardModel } from 'src/app/modules/game/models/putcard.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private httpService$: HttpClient) {}

  //Commands
  public createGame(body: any) {
    return this.httpService$.post('http://localhost:8080/juego/crear', {
      ...body,
    });
  }

  startGame(body: any) {
    return this.httpService$.post(`http://localhost:8080/juego/iniciar`, body);
  }

  public startRound(body: any) {
    return this.httpService$.post(
      `http://localhost:8080/juego/ronda/iniciar`,
      body
    );
  }

  public createRound(body: any) {
    return this.httpService$.post(
      `http://localhost:8080/juego/crear/ronda`,
      body
    );
  }

  public putCard(body: PutCardModel) {
    return this.httpService$.post(`http://localhost:8080/juego/poner`, body);
  }

  //Queries
  public getGame(idGame: string) {
    return this.httpService$.get(
      `http://localhost:8080/juego/listar/${idGame}`
    );
  }

  public getAllGames() {
    return this.httpService$.get(`http://localhost:8080/juegos/listar`);
  }

  public getBoard(idGame: string): Observable<BoardModel> {
    return this.httpService$.get<BoardModel>(
      `http://localhost:8080/tablero/${idGame}`
    );
  }

  public getMazo(idPlayer: string, idGame: string): Observable<MazoModel> {
    return this.httpService$.get<MazoModel>(
      `http://localhost:8080/juego/mazo/${idPlayer}/${idGame}`
    );
  }

  // public getMazoForPlayer(idPlayer: string, idGame: string): Observable<MazoModel> {
  //   return this.httpService$.get<MazoModel>(
  //     `http://localhost:8080/mazo/${idPlayer}/${idGame}`
  //   );
  // }
}

