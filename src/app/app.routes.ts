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
    data: { favicon: 'tictactoe.ico' },
  },
  {
    path: 'guess-number',
    loadComponent: () => import('./features/guess-number/guess-number').then((m) => m.GuessNumber),
    data: { favicon: 'guess-number.ico' },
  },
  {
    path: '**',
    loadComponent: () => import('./shared/404/404').then((c) => c.Page404),
  },
];
