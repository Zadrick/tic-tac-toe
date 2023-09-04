import Matrix, { IMatrixCoordinates } from '@/shared/data-structures/matrix';
import Board from './board';
import { GameSides, IBoard, IPlayer, IPlayerO, IPlayerX, ITicTacToe } from './contracts';
import CircularLinkedList from '@/shared/data-structures/circular-linked-list';
import PlayerX from './player-x';
import PlayerO from './player-o';
import Array2D from '@/shared/data-structures/array-2D';

export default class TicTacToe implements ITicTacToe {
  board: IBoard = new Board();
  currentPlayer: IPlayer;

  playerX: IPlayerX;
  playerO: IPlayerO;

  private playersCircularList: CircularLinkedList<IPlayer>;

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

    if (hasCurrentPlayerWon) return

    this.iterateTurn();
  }

  hasCurrentPlayerWon(): boolean {
    const currentPlayer: IPlayer = this.currentPlayer;
    const boardData: Matrix<GameSides> = this.board.data;
    const isEveryMatch = (row: GameSides[]) => row.every(side => side === currentPlayer.side);

    const isHorizontalWinning: boolean = !!boardData.rows.find(isEveryMatch);
    if (isHorizontalWinning) return true;

    const isVerticalWinning: boolean = !!boardData.cols.find(isEveryMatch);
    if (isVerticalWinning) return true;

    const diagonals: Array2D<GameSides> = new Array2D<GameSides>(2, 3);

    for (let i = 0; i < boardData.rows.length; i++) {
      diagonals[0][i] = boardData.rows[i][i];
      diagonals[1][i] = boardData.rows[i][boardData.rows.length - i - 1];
    }

    const isDiagonalWinning: boolean = !!diagonals.find(isEveryMatch);
    if (isDiagonalWinning) return true;

    return false;
  }
}
