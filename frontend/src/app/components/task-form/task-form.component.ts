import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../task-list/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../types';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  newTask = {
    title: '',
    description: '',
    status: false,
    priority: 'low',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  @Output() close = new EventEmitter<void>();
  @Input() tasks: Task[] = [];

  handleClose() {
    this.close.emit();
  }

  handleCreateTask() {
    this.taskService.addTask(this.newTask).subscribe((addedTask: Task) => {
      this.tasks.push(addedTask);
      this.handleClose();
    });
  }
}
