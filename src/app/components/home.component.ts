import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1 class="welcome-title">Welcome to Task & Habits</h1>
      <p class="welcome-message">Select Tasks or Habits from the menu to get started.</p>
    </div>
    `,
  styles: [`
    .home-container {
      padding: 2rem;
      text-align: center;
      margin-top: 2rem;
  }
  .welcome-title {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  .welcome-message {
    font-size: 1.2rem;
    color: #4a5568;
  }
  body.dark-mode .welcome-title {
    color: #e2e8f0;
  }
  body.dark-mode .welcome-message {
    color: #cbd5e0;
  }
  `],
  standalone: true,
  imports: [CommonModule]
  })
export class HomeComponent {}
