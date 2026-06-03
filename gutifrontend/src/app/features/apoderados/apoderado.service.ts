import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Apoderado {
  id?: number;
  rut: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  relacion: string;
}

@Injectable({ providedIn: 'root' })
export class ApoderadoService {
  private url = 'http://localhost:8080/api/apoderados';

  constructor(private http: HttpClient) {}

  listar() { return this.http.get<Apoderado[]>(this.url); }
  obtener(id: number) { return this.http.get<Apoderado>(`${this.url}/${id}`); }
  crear(a: Apoderado) { return this.http.post<Apoderado>(this.url, a); }
  actualizar(id: number, a: Apoderado) { return this.http.put<Apoderado>(`${this.url}/${id}`, a); }
  eliminar(id: number) { return this.http.delete<void>(`${this.url}/${id}`); }
}
