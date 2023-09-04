import { IMatrixCoordinates } from '@/shared/data-structures/matrix';
import { IPlayer, GameSides, ITicTacToe } from './contracts';


export default abstract class Player implements IPlayer {
  abstract readonly side: GameSides;
  readonly game: ITicTacToe;

  constructor(game: ITicTacToe) {
    this.game = game;
  }

  markMove(coordinates: IMatrixCoordinates): void {
    this.game.markMove(coordinates);
  }
}
