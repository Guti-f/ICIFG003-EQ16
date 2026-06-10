import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrevista } from '../models/entrevista.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EntrevistaService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/entrevistas`;

  getAll(): Observable<Entrevista[]> {
    return this.http.get<Entrevista[]>(this.apiUrl);
  }

  create(entrevista: Entrevista): Observable<Entrevista> {
    return this.http.post<Entrevista>(this.apiUrl, entrevista);
  }

  update(entrevista: Entrevista): Observable<Entrevista> {
    return this.http.put<Entrevista>(`${this.apiUrl}/${entrevista.id}`, entrevista);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
