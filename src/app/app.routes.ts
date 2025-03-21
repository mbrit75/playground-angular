import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/features/dogs/components/dog-component/dog.component').then(c => c.DogComponent)
  }
];
