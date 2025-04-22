import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskDetails } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'http://localhost:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  getTask(id: number): Observable<TaskDetails> {
    return this.http.get<TaskDetails>(`${this.url}${id}/`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}post/`, task);
  }

  updateTask(partOfTask: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.url}${partOfTask.id}/`, partOfTask);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url}${id}/`);
  }
}
