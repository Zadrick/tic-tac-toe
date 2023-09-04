import Matrix, { IMatrixCoordinates } from '@/shared/data-structures/matrix';

export enum GameSides {
  X = 'X',
  O = 'O',
}

export interface ITicTacToe {
  board: IBoard;
  currentPlayer: IPlayer;
  playerX: IPlayerX;
  playerO: IPlayerO;

  markMove(coordinates: IMatrixCoordinates): void;
  hasCurrentPlayerWon(): boolean;
}

export interface IPlayer {
  readonly side: GameSides;
  readonly game: ITicTacToe;

  markMove(coordinates: IMatrixCoordinates): void;
}

export interface IPlayerO extends IPlayer {
  side: GameSides.O;
}

export interface IPlayerX extends IPlayer {
  side: GameSides.X;
}

export interface IBoard {
  data: Matrix<GameSides>;

  markMove(coordinates: IMatrixCoordinates, value: GameSides): void;
}
