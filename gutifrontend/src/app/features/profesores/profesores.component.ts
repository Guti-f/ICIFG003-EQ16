import { Component, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfesorService, Profesor } from './profesor.service';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <nav class="navbar navbar-dark bg-primary px-3">
      <span class="navbar-brand fw-bold">🎓 Sistema de Entrevistas</span>
      <a routerLink="/menu" class="btn btn-outline-light btn-sm">← Menú</a>
    </nav>

    <div class="page-container">
      <h2 class="fw-bold mb-4">👨‍🏫 Gestión de Profesores</h2>

      <!-- Formulario -->
      <div class="card p-4 mb-4">
        <h5 class="fw-bold mb-3">{{ editando() ? 'Editar Profesor' : 'Nuevo Profesor' }}</h5>
        <form [formGroup]="form" (ngSubmit)="guardar()">
          <div class="row g-2">
            <div class="col-md-2">
              <input class="form-control" formControlName="rut" placeholder="RUT (12345678-9)">
            </div>
            <div class="col-md-2">
              <input class="form-control" formControlName="nombre" placeholder="Nombre">
            </div>
            <div class="col-md-2">
              <input class="form-control" formControlName="apellido" placeholder="Apellido">
            </div>
            <div class="col-md-2">
              <input class="form-control" formControlName="email" placeholder="Email">
            </div>
            <div class="col-md-2">
              <input class="form-control" formControlName="telefono" placeholder="Teléfono">
            </div>
            <div class="col-md-2">
              <input class="form-control" formControlName="asignatura" placeholder="Asignatura">
            </div>
          </div>
          <div class="mt-3 d-flex gap-2">
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              {{ editando() ? 'Actualizar' : 'Crear' }}
            </button>
            @if (editando()) {
              <button type="button" class="btn btn-secondary" (click)="cancelar()">Cancelar</button>
            }
          </div>
        </form>
      </div>

      <!-- Tabla -->
      @if (cargando()) {
        <p class="text-muted">Cargando...</p>
      } @else {
        <div class="card">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>RUT</th><th>Nombre</th><th>Apellido</th>
                  <th>Email</th><th>Teléfono</th><th>Asignatura</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                @for (p of profesores(); track p.id) {
                  <tr>
                    <td>{{ p.rut }}</td>
                    <td>{{ p.nombre }}</td>
                    <td>{{ p.apellido }}</td>
                    <td>{{ p.email }}</td>
                    <td>{{ p.telefono }}</td>
                    <td>{{ p.asignatura }}</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-action" (click)="editar(p)">Editar</button>
                      <button class="btn btn-sm btn-danger" (click)="eliminar(p.id!)">Eliminar</button>
                    </td>
                  </tr>
                } @empty {
                  <tr><td colspan="7" class="text-center text-muted">No hay profesores registrados.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class ProfesoresComponent implements OnInit {
  profesores = signal<Profesor[]>([]);
  cargando = signal(true);
  editando = signal<number | null>(null);

  form = this.fb.group({
    rut: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.email],
    telefono: [''],
    asignatura: ['']
  });

  constructor(private service: ProfesorService, private fb: FormBuilder) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.cargando.set(true);
    this.service.listar().subscribe(data => {
      this.profesores.set(data);
      this.cargando.set(false);
    });
  }

  guardar() {
    const id = this.editando();
    const datos = this.form.value as Profesor;
    const op = id
      ? this.service.actualizar(id, datos)
      : this.service.crear(datos);

    op.subscribe(() => { this.cargar(); this.cancelar(); });
  }

  editar(p: Profesor) {
    this.editando.set(p.id!);
    this.form.patchValue(p);
  }

  cancelar() {
    this.editando.set(null);
    this.form.reset();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este profesor?'))
      this.service.eliminar(id).subscribe(() => this.cargar());
  }
}
