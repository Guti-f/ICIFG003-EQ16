import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EntrevistaStore } from '../services/entrevista.store';
import { Entrevista } from '../models/entrevista.model';

@Component({
  selector: 'app-entrevista-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './entrevista-list.html'
})
export class EntrevistaList implements OnInit {

  store = inject(EntrevistaStore);

  ngOnInit() {
    this.store.load();
  }

  editar(entrevista: Entrevista) {
    this.store.select(entrevista);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta entrevista?')) {
      this.store.remove(id);
    }
  }

  badgeClass(estado: string): string {
    switch (estado) {
      case 'Programada': return 'bg-primary';
      case 'Realizada': return 'bg-success';
      case 'Cancelada': return 'bg-secondary';
      default: return 'bg-light text-dark';
    }
  }
}
