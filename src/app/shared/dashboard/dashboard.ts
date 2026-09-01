import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  // @Output() darkModeToggled = new EventEmitter<void>();

  // signal for dark mode toggle
  darkModeToggled = output<void>();

  onDarkModeClick() {
    this.darkModeToggled.emit();
  }
}
