import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { Task } from '../../types';
import { TaskFormComponent } from '../task-form/task-form.component';
import { RouterModule,RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent, RouterModule ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filterStatus: string = 'all';
  isFormOpened = false;
  task: any;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  getFilteredTasks() {
    if (this.filterStatus === 'all') {
      return this.tasks;
    } else if (this.filterStatus === 'completed') {
      return this.tasks.filter((task) => task.status === true);
    }

    return this.tasks.filter((task) => task.status === false);
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'low-priority';
      case 'medium':
        return 'medium-priority';
      case 'high':
        return 'high-priority';
      default:
        return '';
    }
  }

  openForm() {
    this.isFormOpened = true;
  }

  closeForm() {
    this.isFormOpened = false;
  }

  handleCheckChange(id: number | undefined, currentStatus: boolean) {
    if (id === undefined) return;

    const updatedStatus = !currentStatus;
    this.taskService.updateTask(id, { status: updatedStatus }).subscribe(() => {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.status = updatedStatus;
      }
    });
  }

  goToTask(taskId: number): void {
    this.router.navigate(['/tasks', taskId]);
  }
}
