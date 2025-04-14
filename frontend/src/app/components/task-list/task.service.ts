import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'http://localhost:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}${id}/`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}post/`, task);
  }

  updateTask(id: number, partOfTask: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.url}${id}/`, partOfTask);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url}${id}/`);
  }
}
