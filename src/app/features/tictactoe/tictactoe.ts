import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tictactoe.html',
  styleUrl: './tictactoe.css',
})
export class Tictactoe {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  winner = '';
  winningComboIndex = -1;

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
    if (this.board[index] || this.winner) return;

    this.board[index] = this.currentPlayer;
    this.checkWinner();

    if (!this.winner) {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWinner() {
    for (let i = 0; i < this.winCombos.length; i++) {
      const [a, b, c] = this.winCombos[i];
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        this.winningComboIndex = i;
        return;
      }
    }

    if (!this.board.includes('')) {
      this.winner = 'Draw';
    }
  }

  resetGame() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.winner = '';
    this.winningComboIndex = -1;
  }
}
