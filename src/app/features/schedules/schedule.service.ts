import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Schedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = `${environment.apiUrl}/schedules`;

  constructor(private http: HttpClient) { }

  save(schedule: Schedule) {
    return this.http.post<Schedule>(`${this.apiUrl}`, schedule);
  }

  update(id: number, schedule: Schedule) {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, schedule);
  }

  findById(id: number) {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  findAll() {
    return this.http.get<Schedule[]>(`${this.apiUrl}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
