import { Component, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EntrevistaService, Entrevista, EntrevistaRequest } from './entrevista.service';
import { ApoderadoService, Apoderado } from '../apoderados/apoderado.service';
import { ProfesorService, Profesor } from '../profesores/profesor.service';

@Component({
  selector: 'app-entrevistas',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <nav class="navbar navbar-dark bg-primary px-3">
      <span class="navbar-brand fw-bold">🎓 Sistema de Entrevistas</span>
      <a routerLink="/menu" class="btn btn-outline-light btn-sm">← Menú</a>
    </nav>

    <div class="page-container">
      <h2 class="fw-bold mb-4">📅 Gestión de Entrevistas</h2>

      <!-- Formulario -->
      <div class="card p-4 mb-4">
        <h5 class="fw-bold mb-3">{{ editando() ? 'Editar Entrevista' : 'Nueva Entrevista' }}</h5>
        <form [formGroup]="form" (ngSubmit)="guardar()">
          <div class="row g-2">
            <div class="col-md-3">
              <label class="form-label small">Apoderado</label>
              <select class="form-select" formControlName="apoderadoId">
                <option value="">Seleccionar apoderado...</option>
                @for (a of apoderados(); track a.id) {
                  <option [value]="a.id">{{ a.nombre }} {{ a.apellido }} ({{ a.rut }})</option>
                }
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label small">Profesor</label>
              <select class="form-select" formControlName="profesorId">
                <option value="">Seleccionar profesor...</option>
                @for (p of profesores(); track p.id) {
                  <option [value]="p.id">{{ p.nombre }} {{ p.apellido }} — {{ p.asignatura }}</option>
                }
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label small">Fecha y hora</label>
              <input type="datetime-local" class="form-control" formControlName="fecha">
            </div>
            <div class="col-md-2">
              <label class="form-label small">Estado</label>
              <select class="form-select" formControlName="estado">
                <option value="PROGRAMADA">Programada</option>
                <option value="REALIZADA">Realizada</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label small">Motivo</label>
              <input class="form-control" formControlName="motivo" placeholder="Motivo">
            </div>
            <div class="col-md-12">
              <label class="form-label small">Observaciones (opcional)</label>
              <textarea class="form-control" formControlName="observaciones" rows="2"></textarea>
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
                  <th>Apoderado</th><th>Profesor</th><th>Fecha</th>
                  <th>Motivo</th><th>Estado</th><th>Observaciones</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                @for (e of entrevistas(); track e.id) {
                  <tr>
                    <td>{{ e.apoderado.nombre }} {{ e.apoderado.apellido }}</td>
                    <td>{{ e.profesor.nombre }} {{ e.profesor.apellido }}</td>
                    <td>{{ e.fecha | slice:0:16 | replace:'T':' ' }}</td>
                    <td>{{ e.motivo }}</td>
                    <td>
                      <span [class]="badgeClass(e.estado)">{{ e.estado }}</span>
                    </td>
                    <td>{{ e.observaciones || '—' }}</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-action" (click)="editar(e)">Editar</button>
                      <button class="btn btn-sm btn-danger" (click)="eliminar(e.id!)">Eliminar</button>
                    </td>
                  </tr>
                } @empty {
                  <tr><td colspan="7" class="text-center text-muted">No hay entrevistas registradas.</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class EntrevistasComponent implements OnInit {
  entrevistas = signal<Entrevista[]>([]);
  apoderados = signal<Apoderado[]>([]);
  profesores = signal<Profesor[]>([]);
  cargando = signal(true);
  editando = signal<number | null>(null);

  form = this.fb.group({
    apoderadoId: ['', Validators.required],
    profesorId: ['', Validators.required],
    fecha: ['', Validators.required],
    motivo: ['', Validators.required],
    estado: ['PROGRAMADA', Validators.required],
    observaciones: ['']
  });

  constructor(
    private service: EntrevistaService,
    private apoderadoService: ApoderadoService,
    private profesorService: ProfesorService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cargar();
    this.apoderadoService.listar().subscribe(d => this.apoderados.set(d));
    this.profesorService.listar().subscribe(d => this.profesores.set(d));
  }

  cargar() {
    this.cargando.set(true);
    this.service.listar().subscribe(data => {
      this.entrevistas.set(data);
      this.cargando.set(false);
    });
  }

  guardar() {
    const id = this.editando();
    const v = this.form.value;
    const req: EntrevistaRequest = {
      apoderadoId: Number(v.apoderadoId),
      profesorId: Number(v.profesorId),
      fecha: v.fecha!,
      motivo: v.motivo!,
      estado: v.estado as any,
      observaciones: v.observaciones || undefined
    };

    const op = id ? this.service.actualizar(id, req) : this.service.crear(req);
    op.subscribe(() => { this.cargar(); this.cancelar(); });
  }

  editar(e: Entrevista) {
    this.editando.set(e.id!);
    this.form.patchValue({
      apoderadoId: String(e.apoderado.id),
      profesorId: String(e.profesor.id),
      fecha: e.fecha.slice(0, 16),
      motivo: e.motivo,
      estado: e.estado,
      observaciones: e.observaciones || ''
    });
  }

  cancelar() {
    this.editando.set(null);
    this.form.reset({ estado: 'PROGRAMADA' });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta entrevista?'))
      this.service.eliminar(id).subscribe(() => this.cargar());
  }

  badgeClass(estado: string) {
    return {
      'PROGRAMADA': 'badge bg-primary',
      'REALIZADA':  'badge bg-success',
      'CANCELADA':  'badge bg-danger'
    }[estado] ?? 'badge bg-secondary';
  }
}
