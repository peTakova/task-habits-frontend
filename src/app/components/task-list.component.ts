import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
selector: 'app-task-list',
  template: `
  <div class="max-w-md mx-auto mt-4">
    <h2 class="text-xl font-semibold mb-2">Úlohy</h2>
    <ul class="space-y-2">
      <li
        *ngFor="let task of tasks"
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
  </ul>
</div>
`,
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
