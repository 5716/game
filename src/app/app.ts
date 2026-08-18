import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from "./shared/dashboard/dashboard";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Dashboard],
  templateUrl: 'app.html',
})
export class App {
}
