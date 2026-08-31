import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './shared/dashboard/dashboard';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Dashboard],
  templateUrl: 'app.html',
})
export class App {
  isDarkMode = localStorage.getItem('darkMode') === 'true';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    document.body.classList.toggle('dark-mode', this.isDarkMode);

    this.router.events.subscribe(() => {
      let route = this.activatedRoute;

      while (route.firstChild) {
        route = route.firstChild;
      }

      const favicon = route.snapshot.data['favicon'];

      if (favicon) {
        document.querySelector('link[rel="icon"]')?.setAttribute('href', favicon);
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }
}
