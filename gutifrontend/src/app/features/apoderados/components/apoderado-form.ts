import { Component, inject, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApoderadoStore } from '../services/apoderado.store';
import { Apoderado } from '../models/apoderado.model';

@Component({
  selector: 'app-apoderado-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './apoderado-form.html'
})
export class ApoderadoForm {

  private fb = inject(FormBuilder);
  store = inject(ApoderadoStore);

  form = this.fb.group({
    id: [null as number | null],
    rut: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    telefono: [''],
    email: ['', Validators.email],
    relacion: ['']
  });

  constructor() {
    effect(() => {
      const apoderado = this.store.selected();
      if (apoderado) {
        this.form.patchValue(apoderado);
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const apoderado = this.form.value as Apoderado;

    if (apoderado.id) {
      this.store.update(apoderado);
    } else {
      this.store.add(apoderado);
    }

    this.form.reset();
  }

  cancelar() {
    this.store.clearSelection();
    this.form.reset();
  }
}
