import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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
export class TaskFormComponent implements OnInit {
  newTask = {
    title: '',
    description: '',
    status: false,
    priority: 'low',
  };

  @Input() taskToEdit!: Task;
  @Input() tasks!: Task[];
  @Input() isEditMode: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    if (this.isEditMode && this.taskToEdit) {
      this.newTask = { ...this.taskToEdit };
    }
  }

  handleClose() {
    this.close.emit();
  }

  handleSubmit() {
    if (this.isEditMode && this.taskToEdit) {
      this.handleUpdateTask();
    } else {
      this.handleCreateTask();
    }
  }

  handleCreateTask() {
    this.taskService.addTask(this.newTask).subscribe((addedTask: Task) => {
      this.taskUpdated.emit(addedTask);
      this.handleClose();
    });
  }

  handleUpdateTask() {
    if (!this.taskToEdit) return;

    const updatedTask = { ...this.newTask, id: this.taskToEdit.id };
    console.log(this.taskToEdit);
    this.taskService.updateTask(updatedTask).subscribe((task: Task) => {
      this.taskUpdated.emit(task);
      this.handleClose();
    });
  }
}
