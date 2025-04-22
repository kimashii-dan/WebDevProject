import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../types';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(
      `${this.url}${comment.task}/comments/`,
      comment
    );
  }

  updateComment(partOfComment: Partial<Comment>): Observable<Comment> {
    return this.http.patch<Comment>(
      `${this.url}${partOfComment.task}/comments/${partOfComment.id}/`,
      partOfComment
    );
  }

  deleteComment(commentId: number, taskId: number): Observable<Comment> {
    return this.http.delete<Comment>(
      `${this.url}${taskId}/comments/${commentId}/`
    );
  }
}
