import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HabitService } from '../services/habit.service';
import { Habit } from '../models/habit';

@Component({
  selector: 'app-habit-list',
  template: `
    <div class="page-container">
      <h1 class="page-title">Návyky</h1>

      <!-- Formulár na pridanie návyku -->
      <div class="max-w-md mx-auto mb-4">
          <form (ngSubmit)="addHabit()" class="flex gap-2">
            <input
            [(ngModel)]="newHabitTitle"
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

      <div class="max-w-md mx-auto mt-4">
        <ul class="space-y-2">
          @for (habit of habits; track habit.id) {
            <li
            class="flex justify-between items-center p-2 border rounded"
            [class.bg-green-100]="habit.completed"
            >
            <span
            [class.line-through]="habit.completed"
            (click)="completeHabit(habit.id)"
            class="cursor-pointer"
            >
            {{ habit.title }}
            </span>
            <div>
            <input
            type="checkbox"
            [checked]="habit.completed"
            (change)="completeHabit(habit.id)"
            />
            <button
            (click)="deleteHabit(habit.id)"
            class="ml-2 text-red-500 hover:text-red-700"
            >
            Vymazať
          </button>
          </div>
        </li>
      }
      </ul>
    </div>
  `,
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class HabitListComponent implements OnInit {
habits: Habit[] = [];

constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.habitService.getHabits().subscribe((habits) => (this.habits = habits));
  }

  completeHabit(id: number): void {
    this.habitService.completeHabit(id).subscribe(() => this.loadHabits());
  }

  deleteHabit(id: number): void {
    this.habitService.deleteHabit(id).subscribe(() => this.loadHabits());
  }

  private loadHabits(): void {
    this.habitService.getHabits().subscribe((habits) => (this.habits = habits));
  }
}
