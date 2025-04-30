import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <input formControlName="username" placeholder="Username">
      <input formControlName="email" type="email" placeholder="Email">
      <input formControlName="password" type="password" placeholder="Password">
      <button type="submit">Register</button>
    </form>
  `
  })
  export class RegisterComponent {
    registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    constructor(private fb: FormBuilder, private authService: AuthService) {}

    onSubmit() {
      if (this.registerForm.valid) {
        this.authService.register(this.registerForm.value as User);
      }
    }
}
