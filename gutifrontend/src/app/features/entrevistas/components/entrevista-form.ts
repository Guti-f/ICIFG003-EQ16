import { Component, inject, effect, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntrevistaStore } from '../services/entrevista.store';
import { Entrevista } from '../models/entrevista.model';
import { ApoderadoStore } from '../../apoderados/services/apoderado.store';
import { ProfesorStore } from '../../profesores/services/profesor.store';

@Component({
  selector: 'app-entrevista-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entrevista-form.html'
})
export class EntrevistaForm implements OnInit {

  private fb = inject(FormBuilder);
  store = inject(EntrevistaStore);
  apoderadoStore = inject(ApoderadoStore);
  profesorStore = inject(ProfesorStore);

  form = this.fb.group({
    id: [null as number | null],
    apoderadoId: [null as number | null, Validators.required],
    profesorId: [null as number | null, Validators.required],
    fechaHora: ['', Validators.required],
    motivo: ['', Validators.required],
    estado: ['Programada', Validators.required],
    observaciones: ['']
  });

  constructor() {
    effect(() => {
      const entrevista = this.store.selected();
      if (entrevista) {
        this.form.patchValue({
          id: entrevista.id,
          apoderadoId: entrevista.apoderado.id,
          profesorId: entrevista.profesor.id,
          fechaHora: entrevista.fechaHora,
          motivo: entrevista.motivo,
          estado: entrevista.estado,
          observaciones: entrevista.observaciones || ''
        });
      }
    });
  }

  ngOnInit() {
    this.apoderadoStore.load();
    this.profesorStore.load();
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    const entrevista: Entrevista = {
      id: v.id ?? undefined,
      apoderado: { id: v.apoderadoId! } as any,
      profesor: { id: v.profesorId! } as any,
      fechaHora: v.fechaHora!,
      motivo: v.motivo!,
      estado: v.estado!,
      observaciones: v.observaciones || undefined
    };

    if (entrevista.id) {
      this.store.update(entrevista);
    } else {
      this.store.add(entrevista);
    }

    this.form.reset({ estado: 'Programada' });
  }

  cancelar() {
    this.store.clearSelection();
    this.form.reset({ estado: 'Programada' });
  }
}
