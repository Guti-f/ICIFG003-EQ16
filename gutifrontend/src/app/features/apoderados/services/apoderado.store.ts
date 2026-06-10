import { Injectable, signal, inject } from '@angular/core';
import { ApoderadoService } from './apoderado.service';
import { Apoderado } from '../models/apoderado.model';

@Injectable({ providedIn: 'root' })
export class ApoderadoStore {

  private service = inject(ApoderadoService);

  apoderados = signal<Apoderado[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selected = signal<Apoderado | null>(null);

  load() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: data => {
        this.apoderados.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error cargando apoderados');
        this.loading.set(false);
      }
    });
  }

  select(apoderado: Apoderado) {
    this.selected.set(apoderado);
  }

  clearSelection() {
    this.selected.set(null);
  }

  add(apoderado: Apoderado) {
    this.service.create(apoderado).subscribe({
      next: created => this.apoderados.update(list => [...list, created])
    });
  }

  update(apoderado: Apoderado) {
    this.service.update(apoderado).subscribe({
      next: updated => {
        this.apoderados.update(list =>
          list.map(a => a.id === updated.id ? updated : a)
        );
        this.clearSelection();
      }
    });
  }

  remove(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.apoderados.update(list => list.filter(a => a.id !== id));
      }
    });
  }
}
