import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-login',
template: `
<h2>Prihlásenie</h2>
<input [(ngModel)]="email" placeholder="Email">
<input [(ngModel)]="password" type="password" placeholder="Heslo">
<button (click)="login()">Prihlásiť sa</button>
<p *ngIf="error">{{ error }}</p>
`
})
export class LoginComponent {
email = '';
password = '';
error = '';

constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => this.error = 'Prihlásenie zlyhalo'
    });
  }
}
