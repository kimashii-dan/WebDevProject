import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task-list/task.service';
import { Task } from '../../types';
import { AppComment } from '../../types';
import { CommentService } from './comment.service';
import { TaskFormComponent } from "../task-form/task-form.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  standalone: true,
  imports: [TaskFormComponent, CommonModule, FormsModule]
})
export class TaskDetailsComponent implements OnInit {
  taskId!: number;
  task!: Task;
  comments: AppComment[] = [];
  newComment: string = '';
  error: string = '';
  isFormOpened: boolean = false;
  router: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask();
    this.loadComments();
  }

  loadTask(): void {
    this.taskService.getTask(this.taskId).subscribe({
      next: (data) => this.task = data,
      error: () => this.error = 'Task not found'
    });
  }

  loadComments(): void {
    this.commentService.getCommentsForTask(this.taskId).subscribe({
      next: (data: AppComment[]) => this.comments = data,
      error: () => this.comments = []
    });
  }
  

  handleDeleteTask(): void {
    this.taskService.deleteTask(this.taskId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  handleCheckClick(id: number, currentStatus: boolean): void {
    const updated = { ...this.task, status: !currentStatus };
    this.taskService.updateTask(id, updated).subscribe(() => this.task.status = !currentStatus);
  }

  postComment(): void {
    if (!this.newComment.trim()) return;

    this.commentService.postComment(this.taskId, this.newComment).subscribe({
      next: (comment) => {
        this.comments.push(comment as unknown as AppComment);
        this.newComment = '';
      },
      error: () => {
        console.error('Failed to post comment');
      }
    });
  }

  openForm(): void {
    this.isFormOpened = true;
  }

  closeForm(): void {
    this.isFormOpened = false;
  }

  handleTaskUpdated(updatedTask: Task): void {
    this.task = updatedTask;
    this.closeForm();
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'high-priority';
      case 'medium':
        return 'medium-priority';
      case 'low':
        return 'low-priority';
      default:
        return '';
    }
  }
}
