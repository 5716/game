import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="play('ქვა')">ქვა</button>
    <button (click)="play('ფურცელი')">ფურცელი</button>
    <button (click)="play('მაკრატელი')">მაკრატელი</button>

    <p>შენ: {{ player() }}</p>
    <p>BOT ოპონენტი: {{ computer() }}</p>
    <h1>{{ result() }}</h1>
    <h4>Player Score: {{ playerScore() }}</h4>
    <h4>Computer Score: {{ computerScore() }}</h4>
    @if (drawCount() > 0) {
      <h5>Draw Count: {{ drawCount() }}</h5>
    }
    @if (playerScore() - computerScore() > 10) {
      <h5>ყოჩაღ!! შენ იგებ დიდი ანგარიშით მეტოქის წინააღმდეგ</h5>
    } @else {}
    @if (computerScore() - playerScore() > 10) {
      <h5>სამწუხაროა. შენ აგებ დიდი ანგარიშით მეტოქის წინააღმდეგ</h5>
    }
  `,
})
export class App {
  player = signal('');
  computer = signal('');

  playerScore = signal(0);
  computerScore = signal(0);
  drawCount = signal(0);

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
    const options = ['ქვა', 'ფურცელი', 'მაკრატელი'];
    this.player.set(choice);
    this.computer.set(options[Math.floor(Math.random() * options.length)]);
    console.log(this.result());
    if (this.result() == 'შენ გაიმარჯვე 👍🏻') {
      this.playerScore.update((value) => value + 3);
    }
    if (this.result() == 'შენ წააგე 👎🏻') {
      this.computerScore.update((value) => value + 3);
    }
    if (this.result() == 'ნიჩია 🙌🏻') {
      this.playerScore.update((value) => value + 1);
      this.computerScore.update((value) => value + 1);

      this.drawCount.update((value) => value + 1);
    }
  }
}
