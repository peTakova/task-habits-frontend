import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <h1 class="login-title">Login</h1>

      <div *ngIf="errorMessage" class="error-message">
      {{ errorMessage }}
      </div>

      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="email"
            required
            email
            #emailInput="ngModel"
            class="form-control"
          />
        <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)" class="validation-message">
          <div *ngIf="emailInput.errors?.['required']">E-mail je povinný.</div>
          <div *ngIf="emailInput.errors?.['email']">Zadajte platný e-mail.</div>
        </div>
      </div>

      <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        [(ngModel)]="password"
        required
        minlength="6"
        #passwordInput="ngModel"
        class="form-control"
      />
      <div *ngIf="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)" class="validation-message">
        <div *ngIf="passwordInput.errors?.['required']">Heslo je povinné.</div>
        <div *ngIf="passwordInput.errors?.['minlength']">Heslo musí mať aspoň 6 znakov.</div>
      </div>
    </div>

      <div class="form-actions">
          <button type="submit" [disabled]="loginForm.invalid || isLoading" class="btn-primary">
            {{ isLoading ? 'Prihlasovanie...' : 'Prihlásiť' }}
          </button>
        </div>
      </form>

    <div class="register-link">
      Nemáte účet? <a (click)="goToRegister()">Zaregistrujte sa</a>
    </div>
  </div>
`,
styles: [`
  .login-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-color: white;
    }

    .login-title {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }

    .error-message {
      background-color: #fed7d7;
      color: #e53e3e;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #4a5568;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #cbd5e0;
      border-radius: 4px;
    }

    .login-button {
      width: 100%;
      padding: 0.75rem;
      background-color: #8e44ad;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      margin-top: 1rem;
    }

    .login-button:hover {
      background-color: #9b59b6;
    }

    .login-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .register-link {
      margin-top: 1.5rem;
      text-align: center;
      color: #4a5568;
    }

    .register-link a {
      color: #8e44ad;
      text-decoration: none;
    }

    /* Dark mode styles */
    body.dark-mode .login-container {
      background-color: #2d3748;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    body.dark-mode .login-title {
      color: #e2e8f0;
    }

    body.dark-mode label {
      color: #cbd5e0;
    }

    body.dark-mode .form-control {
      background-color: #4a5568;
      border-color: #718096;
      color: #e2e8f0;
    }

    body.dark-mode .login-button {
      background-color: #a855f7;
    }

    body.dark-mode .login-button:hover {
      background-color: #b366f7;
    }

    body.dark-mode .register-link {
      color: #cbd5e0;
    }

    body.dark-mode .register-link a {
      color: #a855f7;
    }
  `]
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe(
       (response) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (error) => {
          this.isLoading = false;

          if (error.status === 401) {
            this.errorMessage = 'Nesprávne prihlasovacie údaje. Skontrolujte svoje meno a heslo.';
          } else if (error.status === 404) {
            this.errorMessage = 'Používateľský účet neexistuje. Chcete sa zaregistrovať?';
          } else {
            this.errorMessage = 'Nastala chyba pri prihlasovaní. Skúste to znova neskôr.';
          }

          console.error('Login error:', error);
        }
      });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
