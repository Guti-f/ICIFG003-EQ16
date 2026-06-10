import { Component, inject, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorStore } from '../services/profesor.store';
import { Profesor } from '../models/profesor.model';

@Component({
  selector: 'app-profesor-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profesor-form.html'
})
export class ProfesorForm {

  private fb = inject(FormBuilder);
  store = inject(ProfesorStore);

  form = this.fb.group({
    id: [null as number | null],
    rut: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.email],
    telefono: [''],
    asignatura: ['']
  });

  constructor() {
    effect(() => {
      const profesor = this.store.selected();
      if (profesor) {
        this.form.patchValue(profesor);
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const profesor = this.form.value as Profesor;

    if (profesor.id) {
      this.store.update(profesor);
    } else {
      this.store.add(profesor);
    }

    this.form.reset();
  }

  cancelar() {
    this.store.clearSelection();
    this.form.reset();
  }
}
