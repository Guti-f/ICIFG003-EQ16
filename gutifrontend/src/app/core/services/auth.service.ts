import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

interface LoginResponse {
  success: boolean;
  mensaje: string;
  username: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8080/api/auth';

  private _usuario = signal<{ username: string; nombre: string } | null>(
    this.cargarSesion()
  );

  readonly usuario = this._usuario.asReadonly();
  readonly estaAutenticado = computed(() => this._usuario() !== null);

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.API}/login`, { username, password })
      .pipe(
        tap(res => {
          if (res.success) {
            const sesion = { username: res.username, nombre: res.nombre };
            localStorage.setItem('sesion', JSON.stringify(sesion));
            this._usuario.set(sesion);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('sesion');
    this._usuario.set(null);
    this.router.navigate(['/']);
  }

  private cargarSesion() {
    const raw = localStorage.getItem('sesion');
    return raw ? JSON.parse(raw) : null;
  }
}
