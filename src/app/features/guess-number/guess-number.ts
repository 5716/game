import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-number',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-number.html',
  styleUrl: './guess-number.css',
})
export class GuessNumber {
  target = Math.floor(Math.random() * 20) + 1;
  guess = null;
  message = 'გამოიცანი რიცხვი 1 დან 20-ის ჩათვლით';
  attempts = 0;
  maxAttempts = 5;
  won = false;
  gameOver = false;

  get isValid() {
    const n = Number(this.guess);
    return this.guess !== null && this.guess !== '' && n >= 1 && n <= 20;
  }

  checkGuess() {
    if (!this.isValid) return;

    const guessNumber = Number(this.guess);
    this.attempts++;

    if (guessNumber === this.target) {
      this.message = `მართალია! ჩაფიქრებული რიცხვი იყო ${this.target}. შენ დაგჭირდა ${this.attempts} მცდელობა ამ რიცხვის გამოსაცნობად.`;
      this.won = true;
    } else if (this.attempts >= this.maxAttempts) {
      this.message = `შენ ვერ გამოიცანი ჩაფიქრებული რიცხვი, რომელიც იყო ${this.target}`;
      this.gameOver = true;
    } else if (guessNumber > this.target) {
      this.message = 'მაღალია, გაიმეორე მცდელობა';
    } else {
      this.message = 'დაბალია, სცადე ხელახლა';
    }
  }

  resetGame() {
    this.target = Math.floor(Math.random() * 20) + 1;
    this.guess = null;
    this.message = 'გამოიცანი რიცხვი 1 დან 20-ის ჩათვლით';
    this.attempts = 0;
    this.won = false;
    this.gameOver = false;
  }
}
