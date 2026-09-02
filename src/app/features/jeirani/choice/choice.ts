import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-choice',
  imports: [],
  templateUrl: './choice.html',
  styleUrl: './choice.css',
})
export class Choice {
  title = input<number>();
  choice = output<string>();
}
