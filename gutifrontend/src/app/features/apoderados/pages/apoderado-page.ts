import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApoderadoList } from '../components/apoderado-list';
import { ApoderadoForm } from '../components/apoderado-form';

@Component({
  selector: 'app-apoderado-page',
  standalone: true,
  imports: [ApoderadoList, ApoderadoForm, RouterLink],
  template: `
    <nav class="navbar navbar-dark bg-primary shadow-sm">
      <div class="container">
        <a routerLink="/menu" class="navbar-brand mb-0 h4 text-decoration-none text-white">
          ← Volver al menú
        </a>
        <span class="navbar-text text-white">Gestión de Apoderados</span>
      </div>
    </nav>

    <div class="container py-4">
      <app-apoderado-form />
      <app-apoderado-list />
    </div>
  `
})
export class ApoderadoPage {}
