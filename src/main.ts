import Board from 'core/entities/board';
import PlayerX from 'core/entities/player-x';
import PlayerO from 'core/entities/player-o';

const board = new Board();
const playerX = new PlayerO();
const playerO = new PlayerO();

playerX.markMove({ row: 0, column: 1 });
playerO.markMove({ row: 0, column: 1 });

console.log(board);
