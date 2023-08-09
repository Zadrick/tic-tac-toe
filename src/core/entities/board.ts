
import PlayerX from './player-x';
import PlayerO from './player-o';

import Matrix, { IMatrixCoordinates } from '../../shared/data-structures/matrix';
import { IPlayer } from './player';
import { Singleton } from '../../shared/decorators/singletone';
import CircularLinkedList from '../../shared/data-structures/circular-linked-list';

@Singleton
class Board {
  data = new Matrix(3, 3);
  turnOfPlayer: IPlayer;

  private playersCircularLinkedList = new CircularLinkedList<IPlayer>([new PlayerX, new PlayerO]);

  constructor() {
    this.turnOfPlayer = this.playersCircularLinkedList.head.data;
  }

  iteratePlayerTurn(): void {
    this.playersCircularLinkedList.head = this.playersCircularLinkedList.head.next!;

    this.turnOfPlayer = this.playersCircularLinkedList.head.data;
  }

  markMove(coordinates: IMatrixCoordinates): void {
    const cell = this.data.get(coordinates);

    if (cell !== undefined) throw new Error('cell is already marked');

    this.data.set(coordinates, this.turnOfPlayer.side);

    const hasCurrentPlayerWon = this.hasCurrentPlayerWon();

    if (!hasCurrentPlayerWon) this.iteratePlayerTurn();
  }

  hasCurrentPlayerWon(): boolean {
    return false;
  }
}

export default Board;
