import Board from './board';
import { IMatrixCoordinates } from 'shared/data-structures/matrix';

export enum GameSides {
  X = 'X',
  O = 'O',
}

export interface IPlayer {
  side: GameSides;
  board: Board;

  markMove(coordinates: IMatrixCoordinates): void;
}
