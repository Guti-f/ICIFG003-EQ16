import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorStore } from '../services/profesor.store';
import { Profesor } from '../models/profesor.model';

@Component({
  selector: 'app-profesor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor-list.html'
})
export class ProfesorList implements OnInit {

  store = inject(ProfesorStore);

  ngOnInit() {
    this.store.load();
  }

  editar(profesor: Profesor) {
    this.store.select(profesor);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este profesor?')) {
      this.store.remove(id);
    }
  }
}
