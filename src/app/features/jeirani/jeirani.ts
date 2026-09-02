import { Component, computed, signal } from '@angular/core';
import { Choice } from './choice/choice';
import { Results } from './results/results';

@Component({
  selector: 'app-jeirani',
  imports: [Choice, Results],
  templateUrl: './jeirani.html',
  styleUrls: ['./jeirani.css'],
})
export class Jeirani {
  playerMove = signal('');
  computerMove = signal('');

  playerScore = signal(0);
  computerScore = signal(0);
  drawCount = signal(0);

  history = signal<(boolean | null)[]>([]);

  lives = signal(3);
  coins = signal(0);

  heartsArray = computed(() => Array(this.lives()));

  tournamentOver = computed(() => this.playerScore() >= 15 || this.computerScore() >= 15);

  result = computed(() => {
    const p = this.playerMove();
    const c = this.computerMove();

    if (!p || !c) return 'აირჩიე რომელიმე';
    if (p === c) return 'ფრე 🙌🏻';

    const beats: Record<string, string> = {
      'ქვა 👌🏼': 'მაკრატელი ✌🏼',
      'ფურცელი 🖐🏼': 'ქვა 👌🏼',
      'მაკრატელი ✌🏼': 'ფურცელი 🖐🏼',
    };

    return beats[p] === c ? 'შენ გაიმარჯვე 👍🏻' : 'შენ წააგე 👎🏻';
  });

  play(choice: string) {
    if (this.tournamentOver() || this.lives() <= 0) return;

    const options = ['ქვა 👌🏼', 'ფურცელი 🖐🏼', 'მაკრატელი ✌🏼'];
    this.playerMove.set(choice);
    this.computerMove.set(options[Math.floor(Math.random() * options.length)]);

    if (this.result() == 'შენ გაიმარჯვე 👍🏻') {
      this.playerScore.update((value) => value + 1);
      this.history.update((h) => [...h, true]);
      this.coins.update((v) => v + 1);
    }
    if (this.result() == 'შენ წააგე 👎🏻') {
      this.computerScore.update((value) => value + 1);
      this.history.update((h) => [...h, false]);
      this.lives.update((v) => v - 1);
    }
    if (this.result() == 'ფრე 🙌🏻') {
      this.playerScore.update((value) => value + 1);
      this.computerScore.update((value) => value + 1);
      this.drawCount.update((value) => value + 1);
      this.history.update((h) => [...h, null]);
    }
  }

  buyHeart() {
    if (this.coins() >= 2) {
      this.coins.update((v) => v - 2);
      this.lives.update((v) => v + 1);
    }
  }

  reset() {
    this.playerMove.set('');
    this.computerMove.set('');
    this.playerScore.set(0);
    this.computerScore.set(0);
    this.drawCount.set(0);
    this.history.set([]);
    this.lives.set(3);
    this.coins.set(0);
  }
}
