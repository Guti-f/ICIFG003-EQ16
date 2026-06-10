import { Injectable, signal, inject } from '@angular/core';
import { ProfesorService } from './profesor.service';
import { Profesor } from '../models/profesor.model';

@Injectable({ providedIn: 'root' })
export class ProfesorStore {

  private service = inject(ProfesorService);

  profesores = signal<Profesor[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selected = signal<Profesor | null>(null);

  load() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: data => {
        this.profesores.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error cargando profesores');
        this.loading.set(false);
      }
    });
  }

  select(profesor: Profesor) {
    this.selected.set(profesor);
  }

  clearSelection() {
    this.selected.set(null);
  }

  add(profesor: Profesor) {
    this.service.create(profesor).subscribe({
      next: created => this.profesores.update(list => [...list, created])
    });
  }

  update(profesor: Profesor) {
    this.service.update(profesor).subscribe({
      next: updated => {
        this.profesores.update(list =>
          list.map(p => p.id === updated.id ? updated : p)
        );
        this.clearSelection();
      }
    });
  }

  remove(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.profesores.update(list => list.filter(p => p.id !== id));
      }
    });
  }
}
