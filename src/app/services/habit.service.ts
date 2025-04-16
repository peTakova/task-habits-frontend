import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habit } from '../models/habit';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class HabitService {
  private apiUrl = 'http://localhost:7010/habit';

  constructor(private http: HTTPClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.apiUrl}/habits`, { headers: this.getHeaders() });
  }

  getHabit(id: number): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/get/${id}`, { headers: this.getHeaders() });
  }

  createHabit(habit: Habit): Observable<Habit> {
    return this.http.post<Habit>(`${this.apiUrl}/create`, habit, { headers: this.getHeaders() });
  }

  updateHabit(id: number, habit: Habit): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, habit, { headers: this.getHeaders() });
  }

  completeHabit(id: number): Observable<string> {
    return this.http.patch<string>(`${this.apiUrl}/habits/${id}/complete`, null, { headers: this.getHeaders() });
  }

  deleteHabit(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

}
