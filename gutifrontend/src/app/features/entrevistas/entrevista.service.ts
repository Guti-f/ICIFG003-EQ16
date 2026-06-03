import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apoderado } from '../apoderados/apoderado.service';
import { Profesor } from '../profesores/profesor.service';

export type EstadoEntrevista = 'PROGRAMADA' | 'REALIZADA' | 'CANCELADA';

export interface Entrevista {
  id?: number;
  apoderado: Apoderado;
  profesor: Profesor;
  fecha: string;
  motivo: string;
  estado: EstadoEntrevista;
  observaciones?: string;
}

export interface EntrevistaRequest {
  apoderadoId: number;
  profesorId: number;
  fecha: string;
  motivo: string;
  estado: EstadoEntrevista;
  observaciones?: string;
}

@Injectable({ providedIn: 'root' })
export class EntrevistaService {
  private url = 'http://localhost:8080/api/entrevistas';

  constructor(private http: HttpClient) {}

  listar() { return this.http.get<Entrevista[]>(this.url); }
  obtener(id: number) { return this.http.get<Entrevista>(`${this.url}/${id}`); }
  crear(e: EntrevistaRequest) { return this.http.post<Entrevista>(this.url, e); }
  actualizar(id: number, e: EntrevistaRequest) { return this.http.put<Entrevista>(`${this.url}/${id}`, e); }
  eliminar(id: number) { return this.http.delete<void>(`${this.url}/${id}`); }
}
