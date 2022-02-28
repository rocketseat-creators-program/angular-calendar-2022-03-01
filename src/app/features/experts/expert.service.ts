import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Expert } from './expert';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  private apiUrl = `${environment.apiUrl}/experts`;

  constructor(private http: HttpClient) { }

  save(expert: Expert) {
    return this.http.post<Expert>(`${this.apiUrl}`, expert);
  }

  update(id: number, expert: Expert) {
    return this.http.put<Expert>(`${this.apiUrl}/${id}`, expert);
  }

  findById(id: number) {
    return this.http.get<Expert>(`${this.apiUrl}/${id}`);
  }

  findAll() {
    return this.http.get<Expert[]>(`${this.apiUrl}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
