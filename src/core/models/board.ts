
import Matrix, { IMatrixCoordinates } from '@/shared/data-structures/matrix';
import { GameSides, IBoard, IPlayer } from './contracts';

export default class Board implements IBoard {
  data = new Matrix<GameSides>(3);

  markMove(coordinates: IMatrixCoordinates, value: GameSides): void {
    this.data.set(coordinates, value);
  }
}
