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
  `,
})
export class App {
  player = signal('');
  computer = signal('');

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
  }
}
