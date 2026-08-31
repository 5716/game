import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  @Output() darkModeToggled = new EventEmitter<void>();

  onDarkModeClick() {
    this.darkModeToggled.emit();
  }
}
