import { Injectable, signal, inject } from '@angular/core';
import { EntrevistaService } from './entrevista.service';
import { Entrevista } from '../models/entrevista.model';

@Injectable({ providedIn: 'root' })
export class EntrevistaStore {

  private service = inject(EntrevistaService);

  entrevistas = signal<Entrevista[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selected = signal<Entrevista | null>(null);

  load() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: data => {
        this.entrevistas.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error cargando entrevistas');
        this.loading.set(false);
      }
    });
  }

  select(entrevista: Entrevista) {
    this.selected.set(entrevista);
  }

  clearSelection() {
    this.selected.set(null);
  }

  add(entrevista: Entrevista) {
    this.service.create(entrevista).subscribe({
      next: created => this.entrevistas.update(list => [...list, created])
    });
  }

  update(entrevista: Entrevista) {
    this.service.update(entrevista).subscribe({
      next: updated => {
        this.entrevistas.update(list =>
          list.map(e => e.id === updated.id ? updated : e)
        );
        this.clearSelection();
      }
    });
  }

  remove(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.entrevistas.update(list => list.filter(e => e.id !== id));
      }
    });
  }
}
