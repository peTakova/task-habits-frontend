import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
selector: 'app-task-list',
  template: `
    <div class="page-container">
      <h1 class="page-title">Úlohy</h1>

      <!-- Vloženie formulára na pridanie úlohy -->
      <app-task-form></app-task-form>

      <div class="max-w-md mx-auto mt-4">
        <ul class="space-y-2">
          @for (task of tasks; track task.id) {
            <li
            class="flex justify-between items-center p-2 border rounded"
            [class.bg-green-100]="task.completed"
            >
            <span
            [class.line-through]="task.completed"
            (click)="completeTask(task.id)"
            class="cursor-pointer"
            >
            {{ task.title }}
            </span>
            <div>
            <input
            type="checkbox"
            [checked]="task.completed"
            (change)="completeTask(task.id)"
            />
            <button
            (click)="deleteTask(task.id)"
            class="ml-2 text-red-500 hover:text-red-700"
            >
      Vymazať
      </button>
    </div>
    </li>
    }
    </ul>
    </div>
</div>
    `,
  styles: [`
    .page-container {
    padding: 1rem;
    }
    .page-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    body.dark-mode .page-title {
      color: #e2e8f0;
    }
`],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class TaskListComponent implements OnInit {
tasks: Task[] = [];

constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}
