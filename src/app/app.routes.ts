import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dogs/components/dog.component').then(c => c.DogComponent)
  }
];
