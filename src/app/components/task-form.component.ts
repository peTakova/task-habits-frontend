import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-form',
    template: `
      <div class="max-w-md mx-auto mt-4">
        <form (ngSubmit)="onSubmit()" class="flex gap-2">
        <input
          [(ngModel)]="taskTitle"
          name="taskTitle"
          type="text"
          placeholder="Nová úloha..."
          class="w-full p-2 border rounded"
          />
          <button type="submit" class="bg-blue-500 text-white p-2 rounded">
          Pridať
          </button>
        </form>
      </div>
    `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TaskFormComponent {
  taskTitle: string = '';

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    if (this.taskTitle.trim()) {
      const newTask: Task = {
        id: 0,
        title: this.taskTitle,
        description: '',
        dueDate: null,
        status: 'PENDING',
        userId: 0
      };

      this.taskService.createTask(newTask).subscribe(() => {
        this.taskTitle = '';
      });
    }
  }
}
