import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:7010/task';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { headers: this.getHeaders() });
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/get/${id}`, { headers: this.getHeaders() });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/create`, task, { headers: this.getHeaders() });
  }

  updateTask(id: number, task: Task): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, task, { headers: this.getHeaders() });
  }

  completeTask(id: number): Observable<string> {
    return this.http.patch<string>(`${this.apiUrl}/tasks/${id}/complete`, null, { headers: this.getHeaders() });
  }

  deleteTask(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
}
