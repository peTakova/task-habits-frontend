import { Component, OnInit } from '@angular/core';
import { HabitService } from '../services/habit.service';
import { Habit } from '../models/habit';

@Component({
  selector: 'app-habit-list',
  template: `
    <div class="max-w-md mx-auto mt-4">
      <h2 class="text-xl font-semibold mb-2">Návyky</h2>
        <ul class="space-y-2">
        <li
          *ngFor="let habit of habits"
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
      </ul>
    </div>
  `,
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
