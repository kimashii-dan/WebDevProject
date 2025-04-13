import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
})

export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filterStatus: string = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  get filteredTasks() {
    if (this.filterStatus === 'all') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.status.name === this.filterStatus);


  }
}
