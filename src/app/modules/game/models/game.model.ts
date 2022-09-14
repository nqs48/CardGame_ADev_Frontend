import { JugadorModel } from './jugador.model';

export interface GameModel {
  id: string;
  iniciado: boolean;
  finalizado: boolean;
  uid: string;
  cantidadJugadores: number;
  jugadores: { [key: string]: JugadorModel };
  ganador: null;
}
