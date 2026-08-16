import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      @if (!tournamentOver() && lives() > 0) {
        <button (click)="play('ქვა 👌🏼')">ქვა</button>
        <button (click)="play('ფურცელი 🖐🏼')">ფურცელი</button>
        <button (click)="play('მაკრატელი ✌🏼')">მაკრატელი</button>
      }
      <button (click)="reset()">რესეტი 🔃</button>

      <p class="hearts">
        @for (h of heartsArray(); track $index) {
          <span>❤️</span>
        }
        @if (lives() === 0) {
          <span>გული აღარ გაქვს</span>
        }
      </p>

      <p>მონეტები: {{ coins() }}</p>

      @if (lives() === 0) {
        <button (click)="buyHeart()">იყიდე გული (3 💰)</button>
      }

      <h1>{{ result() }}</h1>

      <div class="leaderboard">
        <div class="leaderboard-side">
          <p class="name">შენ 🤵🏻</p>
          <p>{{ player() }}</p>
          <h4 class="score">{{ playerScore() }}</h4>
        </div>
        <div class="leaderboard-side">
          <p class="name">მეტოქე 👨🏻‍💻</p>
          <p>{{ computer() }}</p>
          <h4 class="score">{{ computerScore() }}</h4>
        </div>
      </div>

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
          {{
            playerScore() > computerScore() ? 'შენ გაიმარჯვე ტურნირში 🏆' : 'შენ წააგე ტურნირი 😢'
          }}
        </h2>
      }
    </div>
  `,
})
export class App {
  player = signal('');
  computer = signal('');

  playerScore = signal(0);
  computerScore = signal(0);
  drawCount = signal(0);

  history = signal<(boolean | null)[]>([]);

  lives = signal(3);
  coins = signal(0);

  heartsArray = computed(() => Array(this.lives()));

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
    if (this.tournamentOver() || this.lives() <= 0) return;

    const options = ['ქვა 👌🏼', 'ფურცელი 🖐🏼', 'მაკრატელი ✌🏼'];
    this.player.set(choice);
    this.computer.set(options[Math.floor(Math.random() * options.length)]);

    if (this.result() == 'შენ გაიმარჯვე 👍🏻') {
      this.playerScore.update((value) => value + 5);
      this.history.update((h) => [...h, true]);
      this.coins.update((v) => v + 1);
    }
    if (this.result() == 'შენ წააგე 👎🏻') {
      this.computerScore.update((value) => value + 5);
      this.history.update((h) => [...h, false]);
      this.lives.update((v) => v - 1);
    }
    if (this.result() == 'ნიჩია 🙌🏻') {
      this.playerScore.update((value) => value + 1);
      this.computerScore.update((value) => value + 1);
      this.drawCount.update((value) => value + 1);
      this.history.update((h) => [...h, null]);
    }
  }

  buyHeart() {
    if (this.coins() >= 3) {
      this.coins.update((v) => v - 3);
      this.lives.update((v) => v + 1);
    }
  }

  reset() {
    this.player.set('');
    this.computer.set('');
    this.playerScore.set(0);
    this.computerScore.set(0);
    this.drawCount.set(0);
    this.history.set([]);
    this.lives.set(3);
    this.coins.set(0);
  }
}
