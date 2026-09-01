import { Component, computed, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-guess-number',
  standalone: true,
  imports: [],
  templateUrl: './guess-number.html',
  styleUrl: './guess-number.css',
})
export class GuessNumber {
  maxValue = signal(20);
  target = signal(Math.floor(Math.random() * this.maxValue()) + 1);
  guess = signal<number | null>(null);
  guessValue = computed(() => this.guess());
  message = linkedSignal(() => `გამოიცანი რიცხვი 1 დან ${this.maxValue()}-ის ჩათვლით`);
  attempts = signal(0);
  maxAttempts = signal(5);
  won = signal(false);
  gameOver = signal(false);

  saba = signal('');

  // get isValid() {
  //   const n = Number(this.guess);
  //   return this.guess !== null && this.guess !== '' && n >= 1 && n <= 20;
  // }

  isValid = computed(() => {
    const n = this.guess();
    return n !== null && n >= 1 && n <= this.maxValue();
  });

  checkGuess() {
    if (!this.isValid()) return;

    const guessNumber = this.guess()!;
    this.attempts.update((a) => a + 1);

    if (guessNumber === this.target()) {
      this.message.set(
        `მართალია! ჩაფიქრებული რიცხვი იყო ${this.target()}. შენ დაგჭირდა ${this.attempts()} მცდელობა ამ რიცხვის გამოსაცნობად.`,
      );
      this.won.set(true);
    } else if (this.attempts() >= this.maxAttempts()) {
      this.message.set(`შენ ვერ გამოიცანი ჩაფიქრებული რიცხვი, რომელიც იყო ${this.target()}`);
      this.gameOver.set(true);
    } else if (guessNumber > this.target()) {
      this.message.set('მაღალია, გაიმეორე მცდელობა');
    } else {
      this.message.set('დაბალია, სცადე ხელახლა');
    }
  }

  resetGame() {
    this.target.set(Math.floor(Math.random() * this.maxValue()) + 1);
    this.guess.set(null);
    this.message.set(`გამოიცანი რიცხვი 1 დან ${this.maxValue()}-ის ჩათვლით`);
    this.attempts.set(0);
    this.won.set(false);
    this.gameOver.set(false);
  }
}
