import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@app/features/dogs/components/dog-component/dog.component').then(c => c.DogComponent)
  },
  {
    path: 'ninja-cats',
    loadComponent: () => import('@app/features/ninja-cats/components/ninja-cat/ninja-cat.component').then(c => c.NinjaCatComponent)
  }
];
