import { GameSides, ITicTacToe, IPlayerX } from './contracts';
import Player from './player';

class PlayerX extends Player implements IPlayerX {
  override readonly side: GameSides.X = GameSides.X;

  constructor(game: ITicTacToe) {
    super(game);
  }
}

export default PlayerX;
