
import Matrix, { IMatrixCoordinates } from '../../shared/data-structures/matrix';
import CircularLinkedList from '../../shared/data-structures/circular-linked-list';
import { GameSides, IBoard, IPlayer } from './contracts';

export default class Board implements IBoard {
  data = new Matrix<GameSides>(3, 3);

  markMove(coordinates: IMatrixCoordinates, value: GameSides): void {
    this.data.set(coordinates, value);
  }
}
