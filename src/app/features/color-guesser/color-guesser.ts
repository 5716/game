import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-guesser',
  standalone: true,
  imports: [CommonModule],
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

  target = this.colors[0];
  options = [this.colors[0], this.colors[1], this.colors[2]];
  score = 0;
  messagePrefix = '';
  messageColor = '';
  wasCorrect = false;

  constructor() {
    this.newRound();
  }

  newRound() {
    const shuffled = [...this.colors].sort(() => Math.random() - 0.5);
    this.options = shuffled.slice(0, 4);
    this.target = this.options[Math.floor(Math.random() * this.options.length)];
    this.messagePrefix = '';
  }

  guess(color: { name: string; value: string }) {
    if (color.name === this.target.name) {
      this.score++;
      this.messagePrefix = 'სწორია! ჩაფიქრებული ფერი იყო ';
      this.wasCorrect = true;
    } else {
      this.messagePrefix = 'არასწორია, სწორი ფერი იყო ';
      this.wasCorrect = false;
    }
    this.messageColor = this.target.value;

    setTimeout(() => this.newRound(), 1200);
  }
}
