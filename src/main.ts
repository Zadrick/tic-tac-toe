import TicTacToe from './core/models/tic-tac-toe';

const ticTacToe = new TicTacToe();

ticTacToe.onWin(() => console.log(ticTacToe.currentPlayer.side, 'won'));

ticTacToe.markMove({ x: 1, y: 0 });
ticTacToe.markMove({ x: 1, y: 1 });

ticTacToe.markMove({ x: 2, y: 0 });
ticTacToe.markMove({ x: 1, y: 2 });

ticTacToe.markMove({ x: 0, y: 0 });
