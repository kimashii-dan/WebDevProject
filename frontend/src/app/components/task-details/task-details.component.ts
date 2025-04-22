import { Component, OnInit } from '@angular/core';
import { Comment, TaskDetails, Task } from '../../types';
import { TaskService } from '../task-list/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from './comment.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TaskFormComponent,
    MatIconModule,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit {
  taskId!: number;
  task!: TaskDetails;
  taskComments!: Comment[];
  isFormOpened = false;
  error: string | null = null;
  newComment = {
    content: '',
    task: 0,
  };

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.taskId = +id;
    this.newComment.task = this.taskId;

    this.taskService.getTask(this.taskId).subscribe({
      next: (data) => {
        this.task = data;
        this.taskComments = this.task.comments;
      },
      error: (err) => {
        this.error = 'Failed to load task details';
        console.error(err);
      },
    });
  }

  getPriorityClass(priority: string): string {
    return `${priority}`;
  }

  handleCheckClick(id: number | undefined, currentStatus: boolean) {
    if (id === undefined) return;

    const updatedStatus = !currentStatus;
    this.taskService.updateTask({ status: updatedStatus, id }).subscribe({
      next: () => {
        if (this.task) {
          this.task.status = updatedStatus;
        }
      },
      error: (err) => {
        console.error('Failed to update task status', err);
      },
    });
  }

  handleCommentSubmit() {
    if (!this.newComment.content.trim()) return;

    this.commentService.addComment(this.newComment).subscribe({
      next: (addedComment: Comment) => {
        this.task.comments.push(addedComment);
        this.newComment.content = '';
      },
      error: (err) => {
        console.error('Failed to add comment', err);
      },
    });
  }

  openForm() {
    this.isFormOpened = true;
  }

  closeForm() {
    this.isFormOpened = false;
  }

  handleTaskUpdated(updatedTask: Task) {
    this.task = {
      ...this.task,
      ...updatedTask,
    };
    this.closeForm();
  }

  handleDeleteTask() {
    if (!confirm('Are you sure you want to delete this task?')) return;

    this.taskService.deleteTask(this.taskId).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Failed to delete task', err);
      },
    });
  }

  handleDeleteComment(commentId: number | undefined) {
    if (!commentId) {
      return;
    }

    const originalComments = [...this.taskComments];
    this.taskComments = this.taskComments.filter(
      (comment) => comment.id !== commentId
    );
    this.commentService.deleteComment(commentId, this.taskId).subscribe({
      next: () => {
        this.taskComments.filter((comment) => comment.id !== commentId);
        console.log('Comment is deleted successfully!');
      },
      error: (err) => {
        console.error('Failed to delete comment', err);
        this.taskComments = originalComments;
      },
    });
  }
}
