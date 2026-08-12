import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    @if (!tournamentOver()) {
      <button (click)="play('ქვა')">ქვა</button>
      <button (click)="play('ფურცელი')">ფურცელი</button>
      <button (click)="play('მაკრატელი')">მაკრატელი</button>
    }
    <button (click)="reset()">რესეტი</button>

    <p>შენ: {{ player() }}</p>
    <p>მეტოქე: {{ computer() }}</p>
    <h1>{{ result() }}</h1>

    <p>
      @for (r of history(); track $index) {
        @if (r === true) {
          <span>✅ </span>
        }
        @if (r === false) {
          <span>❌ </span>
        }
        @if (r === null) {
          <span>➖ </span>
        }
      }
    </p>

    <h4>მოთამაშის ქულა: {{ playerScore() }}</h4>
    <h4>მეტოქის ქულა: {{ computerScore() }}</h4>

    @if (drawCount() > 0) {
      <h5>ნიჩიების რაოდენობა: {{ drawCount() }}</h5>
    }
    @if (playerScore() - computerScore() > 10) {
      <h5>ყოჩაღ!! შენ იგებ დიდი ანგარიშით მეტოქის წინააღმდეგ</h5>
    } @else {}
    @if (computerScore() - playerScore() > 10) {
      <h5>სამწუხაროა. შენ აგებ დიდი ანგარიშით მეტოქის წინააღმდეგ</h5>
    }

    @if (tournamentOver()) {
      <h2>
        ტურნირი დასრულდა!
        {{ playerScore() > computerScore() ? 'შენ გაიმარჯვე ტურნირში 🏆' : 'შენ წააგე ტურნირი 😢' }}
      </h2>
    }
  `,
})
export class App {
  player = signal('');
  computer = signal('');

  playerScore = signal(0);
  computerScore = signal(0);
  drawCount = signal(0);

  history = signal<(boolean | null)[]>([]);

  tournamentOver = computed(() => this.playerScore() >= 50 || this.computerScore() >= 50);

  result = computed(() => {
    const p = this.player();
    const c = this.computer();

    if (!p || !c) return 'აირჩიე რომელიმე';
    if (p === c) return 'ნიჩია 🙌🏻';

    const beats: Record<string, string> = {
      ქვა: 'მაკრატელი',
      ფურცელი: 'ქვა',
      მაკრატელი: 'ფურცელი',
    };

    return beats[p] === c ? 'შენ გაიმარჯვე 👍🏻' : 'შენ წააგე 👎🏻';
  });

  play(choice: string) {
    if (this.tournamentOver()) return;

    const options = ['ქვა', 'ფურცელი', 'მაკრატელი'];
    this.player.set(choice);
    this.computer.set(options[Math.floor(Math.random() * options.length)]);

    if (this.result() == 'შენ გაიმარჯვე 👍🏻') {
      this.playerScore.update((value) => value + 5);
      this.history.update((h) => [...h, true]);
    }
    if (this.result() == 'შენ წააგე 👎🏻') {
      this.computerScore.update((value) => value + 5);
      this.history.update((h) => [...h, false]);
    }
    if (this.result() == 'ნიჩია 🙌🏻') {
      this.playerScore.update((value) => value + 1);
      this.computerScore.update((value) => value + 1);
      this.drawCount.update((value) => value + 1);
      this.history.update((h) => [...h, null]);
    }
  }

  reset() {
    this.player.set('');
    this.computer.set('');
    this.playerScore.set(0);
    this.computerScore.set(0);
    this.drawCount.set(0);
    this.history.set([]);
  }
}
