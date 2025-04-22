import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { Task } from '../../types';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskFormComponent,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks!: Task[];
  filteredTasks!: Task[];
  filterStatus: string = 'all';
  isFormOpened = false;
  error: string | null = null;
  isOrdered = false;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.reverse();
      },
      error: (err) => {
        this.error = 'Failed to load tasks. Please try again later.';
        console.error(err);
      },
    });
  }

  // getFilteredTasks() {
  //   if (this.filterStatus === 'all') {
  //     return this.tasks;
  //   } else if (this.filterStatus === 'completed') {
  //     return this.tasks.filter((task) => task.status === true);
  //   }

  //   return this.tasks.filter((task) => task.status === false);
  // }

  // getTodaysTasks(): Task[] {
  //   const today = new Date();
  //   return this.tasks.filter((task) => {
  //     const created = new Date(task.createdAt as string);
  //     return (
  //       created.getFullYear() === today.getFullYear() &&
  //       created.getMonth() === today.getMonth() &&
  //       created.getDate() === today.getDate()
  //     );
  //   });
  // }

  // getNotTodaysTasks(): Task[] {
  //   const todayIds = new Set(this.getTodaysTasks().map((task) => task.id));
  //   return this.tasks.filter((task) => !todayIds.has(task.id));
  // }

  getPriorityClass(priority: string): string {
    return `priority ${priority}`;
  }

  openForm() {
    this.isFormOpened = true;
  }

  closeForm() {
    this.isFormOpened = false;
  }

  handleCheckChange(
    id: number | undefined,
    currentStatus: boolean,
    event: MouseEvent
  ) {
    event.stopPropagation();
    if (id === undefined) return;

    const updatedStatus = !currentStatus;
    this.taskService.updateTask({ status: updatedStatus, id }).subscribe(() => {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.status = updatedStatus;
      }
    });
  }

  handleCardClick(id: number | undefined) {
    this.router.navigate([id]);
  }

  handleTaskCreated(newTask: Task) {
    this.tasks.unshift(newTask);
    this.closeForm();
  }

  toggle() {
    this.isOrdered = !this.isOrdered;
  }

  get highPriorityTasks(): Task[] {
    return this.tasks.filter((task) => task.priority === 'high');
  }

  get mediumPriorityTasks(): Task[] {
    return this.tasks.filter((task) => task.priority === 'medium');
  }

  get lowPriorityTasks(): Task[] {
    return this.tasks.filter((task) => task.priority === 'low');
  }
}
