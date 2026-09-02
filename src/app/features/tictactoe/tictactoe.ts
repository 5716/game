import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [],
  templateUrl: './tictactoe.html',
  styleUrl: './tictactoe.css',
})
export class Tictactoe {
  board = signal(['', '', '', '', '', '', '', '', '']);
  currentPlayer = signal('X');
  winner = signal('');
  winningComboIndex = signal(-1);

  winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  makeMove(index: number) {
    if (this.board()[index] || this.winner()) return;

    this.board.update((b) => {
      const copy = [...b];
      copy[index] = this.currentPlayer();
      return copy;
    });
    this.checkWinner();

    if (!this.winner()) {
      this.currentPlayer.set(this.currentPlayer() === 'X' ? 'O' : 'X');
    }
  }

  checkWinner() {
    const board = this.board();
    for (let i = 0; i < this.winCombos.length; i++) {
      const [a, b, c] = this.winCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.winner.set(board[a]);
        this.winningComboIndex.set(i);
        return;
      }
    }

    if (!board.includes('')) {
      this.winner.set('Draw');
    }
  }

  resetGame() {
    this.board.set(['', '', '', '', '', '', '', '', '']);
    this.currentPlayer.set('X');
    this.winner.set('');
    this.winningComboIndex.set(-1);
  }
}
