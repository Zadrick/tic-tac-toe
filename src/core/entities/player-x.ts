import { Singleton } from 'shared/decorators/singletone';
import { GameSides, IPlayer } from './player';
import { IMatrixCoordinates } from 'shared/data-structures/matrix';

import Board from './board';

@Singleton
class PlayerX implements IPlayer {
  readonly side: GameSides.X = GameSides.X;
  readonly board = new Board();

  markMove(coordinates: IMatrixCoordinates): void {
    this.board.markMove(coordinates);
  }
}

export default PlayerX;
