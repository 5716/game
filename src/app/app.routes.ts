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
    children: [
      {
        'path': 'red',
        loadComponent: () => import('./features/jeirani/red-demo/red-demo').then((m) => m.RedDemo),
      },
      {
        'path': 'blue',
        loadComponent: () => import('./features/jeirani/blue-demo/blue-demo').then((m) => m.BlueDemo),
      }
    ]
  },
  {
    path: 'tictactoe',
    loadComponent: () => import('./features/tictactoe/tictactoe').then((m) => m.Tictactoe),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/404/404').then((c) => c.Page404),
  },
];
