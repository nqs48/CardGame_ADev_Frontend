import { CardModel } from './card.model';

export interface MazoModel {
  cantidad: number;
  cartas: CardModel[];
  juegoId: string;
  jugadorId: string;
}
