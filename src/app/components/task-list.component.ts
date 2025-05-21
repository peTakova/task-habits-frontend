import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import { TaskFormComponent } from './task-form.component';

@Component({
selector: 'app-task-list',
  template: `
    <div class="page-container">
      <h1 class="page-title">Tasks</h1>
      <h2 class="page-subtitle">Here are your tasks:</h2>

      <!-- Vloženie formulára na pridanie úlohy -->
      <app-task-form></app-task-form>

      <div class="max-w-md mx-auto mt-4">
        <ul class="space-y-2">
          @for (task of tasks; track task.id) {
            <li
            class="flex justify-between items-center p-2 border rounded"
            [class.bg-green-100]="task.status == 'COMPLETED'"
            >
            <span
            [class.line-through]="task.status == 'COMPLETED'"
            (click)="completeTask(task.id)"
            class="cursor-pointer"
            >
            {{ task.title }}
            </span>
            <div>
            <input
            type="checkbox"
            [checked]="task.status == 'COMPLETED'"
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
    .page-subtitle {
      font-size: 1.2rem;
      font-weight: 400;
      margin-bottom: 1.5rem;
      color: #4a5568;
    }
    body.dark-mode .page-title {
      color: #e2e8f0;
    }
    body.dark-mode .page-subtitle {
      color: #cbd5e0;
    }
`],
    standalone: true,
    imports: [CommonModule, TaskFormComponent]
})

export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();

    window.addEventListener('task-added', () => {
      this.loadTasks();
    });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe(
    (tasks) => {
      // Transform backend data for UI display
      this.tasks = tasks.map(task => {
        // Add a completed property for backward compatibility with templates
        // that still might reference task.completed
        return {
          ...task,
          completed: task.status === 'COMPLETED'
        };
      });
    },
    (error) => {
      console.error('Error fetching tasks:', error);
    }
  );
  }
}
