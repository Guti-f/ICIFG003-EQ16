import { Component, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApoderadoService, Apoderado } from './apoderado.service';

@Component({
  selector: 'app-apoderados',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <nav class="navbar navbar-dark bg-primary px-3">
      <span class="navbar-brand fw-bold">🎓 Sistema de Entrevistas</span>
      <a routerLink="/menu" class="btn btn-outline-light btn-sm">← Menú</a>
    </nav>

    <div class="page-container">
      <h2 class="fw-bold mb-4">👨‍👩‍👧 Gestión de Apoderados</h2>

      <!-- Formulario -->
      <div class="card p-4 mb-4">
        <h5 class="fw-bold mb-3">{{ editando() ? 'Editar Apoderado' : 'Nuevo Apoderado' }}</h5>
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
              <input class="form-control" formControlName="telefono" placeholder="Teléfono">
            </div>
            <div class="col-md-2">
              <input class="form-control" formControlName="email" placeholder="Email">
            </div>
            <div class="col-md-2">
              <select class="form-select" formControlName="relacion">
                <option value="">Relación</option>
                <option>Padre</option>
                <option>Madre</option>
                <option>Tutor</option>
                <option>Otro</option>
              </select>
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
                  <th>Teléfono</th><th>Email</th><th>Relación</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                @for (a of apoderados(); track a.id) {
                  <tr>
                    <td>{{ a.rut }}</td>
                    <td>{{ a.nombre }}</td>
                    <td>{{ a.apellido }}</td>
                    <td>{{ a.telefono }}</td>
                    <td>{{ a.email }}</td>
                    <td>{{ a.relacion }}</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-action" (click)="editar(a)">Editar</button>
                      <button class="btn btn-sm btn-danger" (click)="eliminar(a.id!)">Eliminar</button>
                    </td>
                  </tr>
                } @empty {
                  <tr><td colspan="7" class="text-center text-muted">No hay apoderados registrados.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class ApoderadosComponent implements OnInit {
  apoderados = signal<Apoderado[]>([]);
  cargando = signal(true);
  editando = signal<number | null>(null);

  form = this.fb.group({
    rut: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    telefono: [''],
    email: ['', Validators.email],
    relacion: ['']
  });

  constructor(private service: ApoderadoService, private fb: FormBuilder) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.cargando.set(true);
    this.service.listar().subscribe(data => {
      this.apoderados.set(data);
      this.cargando.set(false);
    });
  }

  guardar() {
    const id = this.editando();
    const datos = this.form.value as Apoderado;
    const op = id
      ? this.service.actualizar(id, datos)
      : this.service.crear(datos);

    op.subscribe(() => { this.cargar(); this.cancelar(); });
  }

  editar(a: Apoderado) {
    this.editando.set(a.id!);
    this.form.patchValue(a);
  }

  cancelar() {
    this.editando.set(null);
    this.form.reset();
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este apoderado?'))
      this.service.eliminar(id).subscribe(() => this.cargar());
  }
}
