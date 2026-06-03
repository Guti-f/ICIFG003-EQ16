import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-primary text-white text-center px-3">
      <h1 class="display-4 fw-bold mb-2">🎓 Sistema de Entrevistas</h1>
      <p class="lead mb-1">Gestión de entrevistas entre apoderados y profesores</p>
      <p class="mb-4 opacity-75">ICIF G003 — Taller 2 | Equipo 16</p>

      <div class="card text-dark p-4 mb-4" style="max-width:500px;width:100%">
        <h5 class="fw-bold mb-3">👤 Equipo de Desarrollo</h5>
        <table class="table table-sm mb-0">
          <thead><tr><th>Integrante</th><th>Rol</th></tr></thead>
          <tbody>
            <tr><td>Gustavo Fernández</td><td>Desarrollador General</td></tr>
          </tbody>
        </table>
      </div>

      <a routerLink="/login" class="btn btn-light btn-lg px-5">
        Iniciar sesión →
      </a>
    </div>
  `
})
export class HomeComponent {}
