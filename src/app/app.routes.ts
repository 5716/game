import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'jeirani',
    pathMatch: 'full',
  },
  {
    path: 'jeirani',
    loadComponent: () => import('./features/jeirani/jeirani').then((m) => m.Jeirani),
    title: 'ჯეირანი',
    data: { favicon: 'jeirani.ico' },
    children: [
      {
        path: 'red',
        loadComponent: () => import('./features/jeirani/red-demo/red-demo').then((m) => m.RedDemo),
      },
      {
        path: 'blue',
        loadComponent: () =>
          import('./features/jeirani/blue-demo/blue-demo').then((m) => m.BlueDemo),
      },
    ],
  },
  {
    path: 'tictactoe',
    loadComponent: () => import('./features/tictactoe/tictactoe').then((m) => m.Tictactoe),
    title: 'იქსიკი და ნულიკი',
    data: { favicon: 'tictactoe.ico' },
  },
  {
    path: 'guess-number',
    loadComponent: () => import('./features/guess-number/guess-number').then((m) => m.GuessNumber),
    title: 'გამოიცანი რიცხვი',
    data: { favicon: 'guess-number.ico' },
  },
  {
    path: 'color-guesser',
    loadComponent: () =>
      import('./features/color-guesser/color-guesser').then((m) => m.ColorGuesser),
    title: 'გამოიცანი ფერი',
    data: { favicon: 'guess-number.ico' },
  },
  {
    path: '**',
    loadComponent: () => import('./shared/404/404').then((c) => c.Page404),
    title: 'გვერდი ვერ მოიძებნა',
    data: { favicon: '404.ico' },
  },
];
