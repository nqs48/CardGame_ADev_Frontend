import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {

constructor(private httpService$: HttpClient) {
}



// public createGame(body : any){
//   return this.httpService$.post("http://localhost:8080/juego/crear",{...body})
// }

}