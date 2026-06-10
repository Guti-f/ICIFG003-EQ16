import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EntrevistaList } from '../components/entrevista-list';
import { EntrevistaForm } from '../components/entrevista-form';

@Component({
  selector: 'app-entrevista-page',
  standalone: true,
  imports: [EntrevistaList, EntrevistaForm, RouterLink],
  template: `
    <nav class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container">
        <a routerLink="/menu" class="navbar-brand mb-0 h4 text-decoration-none text-white">
          ← Volver al menú
        </a>
        <span class="navbar-text text-white">Gestión de Entrevistas</span>
      </div>
    </nav>

    <div class="container py-4">
      <app-entrevista-form />
      <app-entrevista-list />
    </div>
  `
})
export class EntrevistaPage {}
