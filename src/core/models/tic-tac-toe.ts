import Matrix, { IMatrixCoordinates } from '@/shared/data-structures/matrix';
import Board from './board';
import { GameSides, IBoard, IPlayer, IPlayerO, IPlayerX, ITicTacToe } from './contracts';
import CircularLinkedList from '@/shared/data-structures/circular-linked-list';
import PlayerX from './player-x';
import PlayerO from './player-o';

export default class TicTacToe implements ITicTacToe {
  board: IBoard = new Board();
  currentPlayer: IPlayer;

  playerX: IPlayerX;
  playerO: IPlayerO;

  private playersCircularList: CircularLinkedList<IPlayer>;
  private onWinCbs: VoidFunction[] = [];

  constructor() {
    const playerX: IPlayerX = new PlayerX(this);
    const playerO: IPlayerO = new PlayerO(this);

    this.playerX = playerX;
    this.playerO = playerO;

    this.playersCircularList = new CircularLinkedList<IPlayer>([this.playerX, this.playerO]);

    this.currentPlayer = this.playersCircularList.head.data;
  }

  private iterateTurn() {
    this.playersCircularList.head = this.playersCircularList.head.next!;

    this.currentPlayer = this.playersCircularList.head.data;
  }

  markMove(coordinates: IMatrixCoordinates): void {
    const isCellMarked = this.board.data.get(coordinates) !== undefined;
    if (isCellMarked) return;

    this.board.markMove(coordinates, this.currentPlayer.side);

    const hasCurrentPlayerWon = this.hasCurrentPlayerWon();

    if (hasCurrentPlayerWon) {
      Object.freeze(this);
      this.onWinCbs.forEach(cb => cb());
      return;
    }

    this.iterateTurn();
  }

  hasCurrentPlayerWon(): boolean {
    const currentPlayer: IPlayer = this.currentPlayer;
    const boardData: Matrix<GameSides> = this.board.data;

    function winCheckFactory(representation: 'rows' | 'columns' | 'diagonals') {
      return !!boardData[representation]
        .find((row) => row.every(cell => cell.value === currentPlayer.side));
    }

    return winCheckFactory('columns') ||
      winCheckFactory('rows') ||
      winCheckFactory('diagonals');
  }

  onWin(cb: VoidFunction) {
    this.onWinCbs.push(cb);
  }
}
