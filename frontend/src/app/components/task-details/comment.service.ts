import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComment } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8000/api'; // your backend URL

  constructor(private http: HttpClient) {}

  getCommentsForTask(taskId: number): Observable<AppComment[]> {
    return this.http.get<AppComment[]>(`${this.apiUrl}/tasks/${taskId}/comments/`);
  }

  postComment(taskId: number, text: string): Observable<AppComment> {
    return this.http.post<AppComment>(`${this.apiUrl}/tasks/${taskId}/comments/`, {
      content: text,
      task: taskId  
    });
  }
  
  
}
