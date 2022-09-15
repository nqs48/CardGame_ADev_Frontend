import { RoundModel } from "./round.model";


export interface BoardModel {
  ronda: RoundModel;
  cantidadJugadores: number;
  jugadoresIniciales: string[];
  jugadorPrincipalId: String;
}


