import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApoderadoStore } from '../services/apoderado.store';
import { Apoderado } from '../models/apoderado.model';

@Component({
  selector: 'app-apoderado-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apoderado-list.html'
})
export class ApoderadoList implements OnInit {

  store = inject(ApoderadoStore);

  ngOnInit() {
    this.store.load();
  }

  editar(apoderado: Apoderado) {
    this.store.select(apoderado);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este apoderado?')) {
      this.store.remove(id);
    }
  }
}
