import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Profesor {
  id?: number;
  rut: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  asignatura: string;
}

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  private url = 'http://localhost:8080/api/profesores';

  constructor(private http: HttpClient) {}

  listar() { return this.http.get<Profesor[]>(this.url); }
  obtener(id: number) { return this.http.get<Profesor>(`${this.url}/${id}`); }
  crear(p: Profesor) { return this.http.post<Profesor>(this.url, p); }
  actualizar(id: number, p: Profesor) { return this.http.put<Profesor>(`${this.url}/${id}`, p); }
  eliminar(id: number) { return this.http.delete<void>(`${this.url}/${id}`); }
}
