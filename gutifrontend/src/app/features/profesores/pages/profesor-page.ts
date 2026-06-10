import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfesorList } from '../components/profesor-list';
import { ProfesorForm } from '../components/profesor-form';

@Component({
  selector: 'app-profesor-page',
  standalone: true,
  imports: [ProfesorList, ProfesorForm, RouterLink],
  template: `
    <nav class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container">
        <a routerLink="/menu" class="navbar-brand mb-0 h4 text-decoration-none text-white">
          ← Volver al menú
        </a>
        <span class="navbar-text text-white">Gestión de Profesores</span>
      </div>
    </nav>

    <div class="container py-4">
      <app-profesor-form />
      <app-profesor-list />
    </div>
  `
})
export class ProfesorPage {}
