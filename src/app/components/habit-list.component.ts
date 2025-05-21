import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitFormComponent } from './habit-form.component';
import { HabitService } from '../services/habit.service';
import { Habit } from '../models/habit';

@Component({
  selector: 'app-habit-list',
  template: `
    <div class="page-container">
      <h1 class="page-title">Habits</h1>
      <h2 class="page-subtitle">Here are your habits:</h2>

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
            {{ habit.name }}
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
  imports: [CommonModule, FormsModule]
})

export class HabitListComponent implements OnInit {
  habits: Habit[] = [];
  newHabitTitle: string = '';

constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.loadHabits();

    window.addEventListener('habit-added', () => {
      this.loadHabits();
    });
  }

  addHabit(): void {
    if (this.newHabitTitle.trim()) {
      const newHabit: Habit = {
        id: 0,
        name: this.newHabitTitle,
        description: '',
        frequency: 'DAILY',
        lastCompletedDate: null,
        userId: 0
      };

      this.habitService.createHabit(newHabit).subscribe(() => {
        this.newHabitTitle = '';
        this.loadHabits();
      });
    }
  }

  completeHabit(id: number): void {
    this.habitService.completeHabit(id).subscribe(() => this.loadHabits());
  }

  deleteHabit(id: number): void {
    this.habitService.deleteHabit(id).subscribe(() => this.loadHabits());
  }

  private loadHabits(): void {

    this.habitService.getHabits().subscribe(
    (habits) => {
      // Transform backend data to include UI completed property
      this.habits = habits.map(habit => {
        // Check if the habit was completed today
        let completed = false;

        if (habit.lastCompletedDate) {
          const lastCompletedDate = new Date(habit.lastCompletedDate);
          const today = new Date();

          // Compare year, month, and day
          completed = (
            lastCompletedDate.getFullYear() === today.getFullYear() &&
            lastCompletedDate.getMonth() === today.getMonth() &&
            lastCompletedDate.getDate() === today.getDate()
          );
        }

        // Create a new habit object with all original properties plus the completed flag
        return {
          ...habit,
          completed: completed,
          // Replace title reference with name if needed in templates
          title: habit.name
        };
      });
    },
    (error) => {
      console.error('Error fetching habits:', error);
    }
  );
  }
}
