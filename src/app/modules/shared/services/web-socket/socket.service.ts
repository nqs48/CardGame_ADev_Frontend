import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  
  websocket!: WebSocketSubject<unknown>;

  constructor() {}

  //Abrir conexion socket
  public connect(idGame: string) {
    this.websocket = webSocket(`ws://localhost:8081/retrieve/${idGame}`);
    return this.websocket;
  }

  //Cerrar conexion socket
  public disconnect() {
    this.websocket.complete();
  }

  // public disconnect() {
  //   this.websocket.unsubscribe();
  // }
}
