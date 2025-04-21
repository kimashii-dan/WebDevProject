import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from '../task-list/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task  } from '../../types';



@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  newTask: Partial<Task>  = {
    title: '',
    description: '',
    status: false,
    priority: 'low',
    createdAt: new Date().toISOString(),
    comments: []
  };
  
  

  constructor(private taskService: TaskService, private router: Router) {}

  @Output() close = new EventEmitter<void>();
  @Input() tasks: Task[] = [];
  @Input() taskToEdit!: Task;
  @Input() isEditMore: boolean = false;

  @Output() taskUpdated = new EventEmitter<Task>();

  ngOnInit(): void {
    if (this.isEditMore && this.taskToEdit) {
      this.newTask = { ...this.taskToEdit };
    }
  }


  handleClose() {
    this.close.emit();
  }


  handleCreateOrUpdateTask() {
    if (this.isEditMore && this.taskToEdit) {
      const updatedTask = { ...this.taskToEdit, ...this.newTask };
      this.taskService.updateTask(this.taskToEdit.id!, updatedTask).subscribe((result) => {
        this.taskUpdated.emit(result);
        this.handleClose();
      });
    } else {
      this.taskService.addTask(this.newTask).subscribe((addedTask: Task) => {
        this.tasks.push(addedTask);
        this.handleClose();
      });
    }
  }
}
