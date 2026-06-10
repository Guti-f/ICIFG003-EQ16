import { Apoderado } from '../../apoderados/models/apoderado.model';
import { Profesor } from '../../profesores/models/profesor.model';

export interface Entrevista {
  id?: number;
  apoderado: Apoderado;
  profesor: Profesor;
  fechaHora: string;
  motivo: string;
  estado: string;
  observaciones?: string;
}
