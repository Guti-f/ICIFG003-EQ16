import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-dark bg-primary px-3">
      <span class="navbar-brand fw-bold">🎓 Sistema de Entrevistas</span>
      <span class="text-white me-3 small">Hola, {{ auth.usuario()?.nombre }}</span>
      <button class="btn btn-outline-light btn-sm" (click)="auth.logout()">Cerrar sesión</button>
    </nav>

    <div class="page-container">
      <h2 class="mb-4 fw-bold">Menú Principal</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 text-center p-4">
            <div class="fs-1 mb-2">👨‍👩‍👧</div>
            <h5 class="fw-bold">Apoderados</h5>
            <p class="text-muted small">Gestión de apoderados del colegio</p>
            <a routerLink="/apoderados" class="btn btn-primary mt-auto">Ir a Apoderados</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 text-center p-4">
            <div class="fs-1 mb-2">👨‍🏫</div>
            <h5 class="fw-bold">Profesores</h5>
            <p class="text-muted small">Gestión de profesores del colegio</p>
            <a routerLink="/profesores" class="btn btn-primary mt-auto">Ir a Profesores</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 text-center p-4">
            <div class="fs-1 mb-2">📅</div>
            <h5 class="fw-bold">Entrevistas</h5>
            <p class="text-muted small">Agendar y administrar entrevistas</p>
            <a routerLink="/entrevistas" class="btn btn-primary mt-auto">Ir a Entrevistas</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MenuComponent {
  constructor(public auth: AuthService) {}
}
