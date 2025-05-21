import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  template: `
    <div class="register-container">
      <h1 class="register-title">Registrácia</h1>

      <div *ngIf="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div *ngIf="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" *ngIf="!registrationComplete">
        <div class="form-group">
          <label for="username">Používateľské meno</label>
          <input
          type="text"
          id="username"
          formControlName="username"
          class="form-control"
          />
          <div *ngIf="registerForm.get('username')?.invalid && (registerForm.get('username')?.dirty || registerForm.get('username')?.touched)" class="validation-message">
          <div *ngIf="registerForm.get('username')?.errors?.['required']">Používateľské meno je povinné.</div>
          <div *ngIf="registerForm.get('username')?.errors?.['minlength']">Používateľské meno musí mať aspoň 3 znaky.</div>
        </div>
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input
        type="email"
        id="email"
        formControlName="email"
        class="form-control"
      />
        <div *ngIf="registerForm.get('email')?.invalid && (registerForm.get('email')?.dirty || registerForm.get('email')?.touched)" class="validation-message">
          <div *ngIf="registerForm.get('email')?.errors?.['required']">E-mail je povinný.</div>
          <div *ngIf="registerForm.get('email')?.errors?.['email']">Zadajte platný e-mail.</div>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Heslo</label>
        <input
          type="password"
          id="password"
          formControlName="password"
          class="form-control"
      />
      <div *ngIf="registerForm.get('password')?.invalid && (registerForm.get('password')?.dirty || registerForm.get('password')?.touched)" class="validation-message">
        <div *ngIf="registerForm.get('password')?.errors?.['required']">Heslo je povinné.</div>
        <div *ngIf="registerForm.get('password')?.errors?.['minlength']">Heslo musí mať aspoň 6 znakov.</div>
      </div>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Potvrdiť heslo</label>
        <input
          type="password"
          id="confirmPassword"
          formControlName="confirmPassword"
          class="form-control"
      />
<div *ngIf="registerForm.get('confirmPassword')?.dirty &&
registerForm.get('password')?.value !== registerForm.get('confirmPassword')?.value"
               class="validation-message">
            Heslá sa nezhodujú.
          </div>
        </div>

        <div class="form-actions">
          <button
            type="submit"
            [disabled]="registerForm.invalid || isLoading ||
                       registerForm.get('password')?.value !== registerForm.get('confirmPassword')?.value"
            class="btn-primary"
          >
            {{ isLoading ? 'Registrácia...' : 'Registrovať' }}
          </button>
        </div>
      </form>

      <div class="action-links">
        <div *ngIf="!registrationComplete">
          Už máte účet? <a (click)="goToLogin()">Prihláste sa</a>
        </div>
        <div *ngIf="registrationComplete">
          <button (click)="goToLogin()" class="btn-primary">Prihlásiť sa</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background-color: white;
    }

    .register-title {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #2c3e50;
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

    .validation-message {
      color: #e53e3e;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }

    .error-message {
      background-color: #fed7d7;
      color: #e53e3e;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .success-message {
      background-color: #c6f6d5;
      color: #38a169;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .form-actions {
      margin-top: 1.5rem;
    }

    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background-color: #8e44ad;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .btn-primary:hover {
      background-color: #9b59b6;
    }

    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .action-links {
      margin-top: 1.5rem;
      text-align: center;
      color: #4a5568;
    }

    .action-links a {
      color: #8e44ad;
      text-decoration: none;
      cursor: pointer;
    }

    /* Dark mode styles */
    :host-context(body.dark-mode) .register-container {
      background-color: #2d3748;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    :host-context(body.dark-mode) .register-title {
      color: #e2e8f0;
    }

    :host-context(body.dark-mode) label {
      color: #cbd5e0;
    }

    :host-context(body.dark-mode) .form-control {
      background-color: #4a5568;
      border-color: #718096;
      color: #e2e8f0;
    }

    :host-context(body.dark-mode) .btn-primary {
      background-color: #a855f7;
    }

    :host-context(body.dark-mode) .btn-primary:hover {
      background-color: #b366f7;
    }

    :host-context(body.dark-mode) .action-links {
      color: #cbd5e0;
    }

    :host-context(body.dark-mode) .action-links a {
      color: #a855f7;
    }
  `]
})
  export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  registrationComplete = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }

    return { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

  const registerData = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    };

    this.authService.register(registerData)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.registrationComplete = true;
          this.successMessage = 'Registrácia bola úspešná! Teraz sa môžete prihlásiť.';
        },
        error: (error) => {
          this.isLoading = false;

          if (error.status === 409) {
            this.errorMessage = 'Používateľ s týmto e-mailom už existuje.';
          } else {
            this.errorMessage = 'Nastala chyba pri registrácii. Skúste to znova neskôr.';
          }

          console.error('Registration error:', error);
        }
      });
    }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
