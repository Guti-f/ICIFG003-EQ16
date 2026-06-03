import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div class="card p-4" style="width:100%;max-width:400px">
        <h4 class="text-center mb-4 fw-bold text-primary">🎓 Iniciar Sesión</h4>

        @if (error()) {
          <div class="alert alert-danger">{{ error() }}</div>
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input type="text" class="form-control" formControlName="username" placeholder="admin">
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" formControlName="password" placeholder="••••••••">
          </div>
          <button type="submit" class="btn btn-primary w-100" [disabled]="loading()">
            {{ loading() ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>

        <div class="text-center mt-3">
          <a routerLink="/" class="text-muted small">← Volver al inicio</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  error = signal('');
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set('');

    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe({
      next: res => {
        this.loading.set(false);
        if (res.success) this.router.navigate(['/menu']);
        else this.error.set(res.mensaje);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Error de conexión con el servidor.');
      }
    });
  }
}
