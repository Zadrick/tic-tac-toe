import { GameSides, IPlayerO, ITicTacToe } from './contracts';
import Player from './player';

class PlayerO extends Player implements IPlayerO {
  override readonly side: GameSides.O = GameSides.O;

  constructor(game: ITicTacToe) {
    super(game);
  }
}

export default PlayerO;
