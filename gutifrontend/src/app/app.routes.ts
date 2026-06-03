import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'menu',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/menu/menu.component').then(m => m.MenuComponent)
  },
  {
    path: 'apoderados',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/apoderados/apoderados.component').then(m => m.ApoderadosComponent)
  },
  {
    path: 'profesores',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profesores/profesores.component').then(m => m.ProfesoresComponent)
  },
  {
    path: 'entrevistas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/entrevistas/entrevistas.component').then(m => m.EntrevistasComponent)
  },
  { path: '**', redirectTo: '' }
];
