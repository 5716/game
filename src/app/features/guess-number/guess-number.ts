import { Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guess-number',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guess-number.html',
  styleUrl: './guess-number.css',
})

export class GuessNumber {

  maxValue = signal(20);
  target = Math.floor(Math.random() * this.maxValue()) + 1;
  guess = signal<number | null>(null);
  guessValue = computed(() => this.guess());
  message = linkedSignal(() => `გამოიცანი რიცხვი 1 დან ${this.maxValue()}-ის ჩათვლით`);
  attempts = 0;
  maxAttempts = 5;
  won = false;
  gameOver = false;


  saba = signal('');

  // get isValid() {
  //   const n = Number(this.guess);
  //   return this.guess !== null && this.guess !== '' && n >= 1 && n <= 20;
  // }

  isValid = computed(() => {
    const n = Number(this.guess());
    return n !== null && n >= 1 && n <= this.maxValue();
  });

  checkGuess() {
    if (!this.isValid()) return;

    const guessNumber = Number(this.guess());
    this.attempts++;

    if (guessNumber === this.target) {
      this.message.set(`მართალია! ჩაფიქრებული რიცხვი იყო ${this.target}. შენ დაგჭირდა ${this.attempts} მცდელობა ამ რიცხვის გამოსაცნობად.`);
      this.won = true;
    } else if (this.attempts >= this.maxAttempts) {
      this.message.set(`შენ ვერ გამოიცანი ჩაფიქრებული რიცხვი, რომელიც იყო ${this.target}`);
      this.gameOver = true;
    } else if (guessNumber > this.target) {
      this.message.set('მაღალია, გაიმეორე მცდელობა');
    } else {
      this.message.set('დაბალია, სცადე ხელახლა');
    }
  }

  resetGame() {
    this.target = Math.floor(Math.random() * this.maxValue()) + 1;
    this.guess.set(null);
    this.message.set(`გამოიცანი რიცხვი 1 დან ${this.maxValue()}-ის ჩათვლით`);
    this.attempts = 0;
    this.won = false;
    this.gameOver = false;
  }
}
