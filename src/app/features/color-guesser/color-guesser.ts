import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-color-guesser',
  standalone: true,
  imports: [],
  templateUrl: './color-guesser.html',
  styleUrl: './color-guesser.css',
})
export class ColorGuesser {
  colors = [
    { name: 'წითელი', value: 'rgb(255, 0, 0)' },
    { name: 'ლურჯი', value: 'rgb(0, 0, 255)' },
    { name: 'მწვანე', value: 'rgb(0, 128, 0)' },
    { name: 'ნარინჯისფერი', value: 'rgb(255, 165, 0)' },
    { name: 'იასამნისფერი', value: 'rgb(128, 0, 128)' },
    { name: 'ფირუზისფერი', value: 'rgb(0, 128, 128)' },
    { name: 'ვარდისფერი', value: 'rgb(255, 192, 203)' },
    { name: 'ყვითელი', value: 'rgb(202, 202, 28)' },
    { name: 'ყავისფერი', value: 'rgb(139, 69, 19)' },
    { name: 'ნაცრისფერი', value: 'rgb(128, 128, 128)' },
    { name: 'ცისფერი', value: 'rgb(0, 255, 255)' },
    { name: 'მაგენტა', value: 'rgb(255, 0, 255)' },
  ];

  target = signal(this.colors[0]);
  options = signal([this.colors[0], this.colors[1], this.colors[2]]);
  score = signal(0);
  messagePrefix = signal('');
  messageColor = signal('');
  wasCorrect = signal(false);

  constructor() {
    this.newRound();
  }

  newRound() {
    const shuffled = [...this.colors].sort(() => Math.random() - 0.5);
    const newOptions = shuffled.slice(0, 4);
    this.options.set(newOptions);
    this.target.set(newOptions[Math.floor(Math.random() * newOptions.length)]);
    this.messagePrefix.set('');
  }

  guess(color: { name: string; value: string }) {
    if (color.name === this.target().name) {
      this.score.update((s) => s + 1);
      this.messagePrefix.set('სწორია! ჩაფიქრებული ფერი იყო ');
      this.wasCorrect.set(true);
    } else {
      this.messagePrefix.set('არასწორია, სწორი ფერი იყო ');
      this.wasCorrect.set(false);
    }
    this.messageColor.set(this.target().value);

    setTimeout(() => this.newRound(), 3000);
  }
}
