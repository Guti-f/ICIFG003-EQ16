import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apoderado } from '../models/apoderado.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApoderadoService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/apoderados`;

  getAll(): Observable<Apoderado[]> {
    return this.http.get<Apoderado[]>(this.apiUrl);
  }

  create(apoderado: Apoderado): Observable<Apoderado> {
    return this.http.post<Apoderado>(this.apiUrl, apoderado);
  }

  update(apoderado: Apoderado): Observable<Apoderado> {
    return this.http.put<Apoderado>(`${this.apiUrl}/${apoderado.id}`, apoderado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
