import { Component, input } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  history = input<(boolean | null)[]>([]);
}
