import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class TaskFormComponent {
taskTitle: string = '';

constructor(private taskService: TaskService) {}

  onSubmit(): void {
    if (this.taskTitle.trim()) {
      const newTask: Task = { id: 0, title: this.taskTitle, completed: false };
      this.taskService.createTask(newTask).subscribe(() => {
        this.taskTitle = '';
      });
    }
  }
}
