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
  target = Math.floor(Math.random() * 50) + 1;
  guess = null;
  message = 'გამოიცანი ჩაფიქრებული რიცხვი, რომელიც არის 1 დან 50 მდე';
  attempts = 0;
  won = false;

  checkGuess() {
    const guessNumber = Number(this.guess);
    this.attempts++;

    if (guessNumber === this.target) {
      this.message = `სწორია! ჩაფიქრებული რიცხვი იყო ${this.target}. შენ დაგჭირდა ${this.attempts} ცდა.`;
      this.won = true;
    } else if (guessNumber > this.target) {
      this.message = 'ეს რიცხვი ჩაფიქრებულ რიცხვზე მაღალია, სცადე ხელახლა';
    } else {
      this.message = 'ეს რიცხვი ჩაფიქრებულ რიცხვზე დაბალია, სცადე ხელახლა';
    }
  }

  resetGame() {
    this.target = Math.floor(Math.random() * 50) + 1;
    this.guess = null;
    this.message = 'გამოიცანი ჩაფიქრებული რიცხვი, რომელიც არის 1 დან 50 მდე';
    this.attempts = 0;
    this.won = false;
  }
}
