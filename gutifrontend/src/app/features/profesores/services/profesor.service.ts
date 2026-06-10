import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from '../models/profesor.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfesorService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profesores`;

  getAll(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  create(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, profesor);
  }

  update(profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}/${profesor.id}`, profesor);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
