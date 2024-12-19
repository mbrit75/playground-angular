import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dogs/dog.component').then(c => c.DogComponent)
  }
];
