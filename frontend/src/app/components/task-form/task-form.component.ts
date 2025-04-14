import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  task = {
    title: '',
    description: '',
    status: 'pending',
    category: ''
  };

  constructor(private taskService: TaskService, private router: Router) {}

  saveTask() {
    this.taskService.addTask(this.task).subscribe(() => {
      this.router.navigate(['/tasks']);
    });
  }
}
