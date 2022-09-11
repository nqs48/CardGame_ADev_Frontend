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

  public getGames() {
    return this.httpService$.get('http://localhost:8080/juego/listar');
  }


}
