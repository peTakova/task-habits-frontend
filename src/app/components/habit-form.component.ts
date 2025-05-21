import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../services/habit.service';
import { Habit } from '../models/habit';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habit-list',
  template: `
    <div class="max-w-md mx-auto mb-4">
      <form (ngSubmit)="onSubmit()" class="flex gap-2">
        <input
          [(ngModel)]="habitTitle"
          name="habitTitle"
          type="text"
          placeholder="Nový návyk..."
          class="w-full p-2 border rounded"
        />
        <button type="submit" class="bg-purple-500 text-white p-2 rounded">
          Pridať
        </button>
      </form>
  </div>
`,
  standalone: true,
  imports: [CommonModule, FormsModule]
  })

export class HabitFormComponent {
    habitTitle: string = '';

  constructor(private habitService: HabitService) {}

  onSubmit(): void {
    if (this.habitTitle.trim()) {
      const newHabit: Habit = {
        id: 0,
        name: this.habitTitle,
        description: '',
        frequency: 'DAILY',
        lastCompletedDate: null,
        userId: 0
      };

      this.habitService.createHabit(newHabit).subscribe(() => {
        this.habitTitle = '';
      });
    }
  }

}
