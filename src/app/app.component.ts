import { Component, Renderer2, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent {
  showMenu = false;
  darkModeActive = false;
  showProfileMenu = false;
  isLoggedIn = false;
  currentUser: any = null;

  constructor(private renderer: Renderer2, private authService: AuthService, private router: Router) {

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      this.darkModeActive = true;
      this.renderer.addClass(document.body, 'dark-mode');
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.showProfileMenu = false;
  }
}

  logout(): void {
    this.authService.logout();
    this.showProfileMenu = false;
    this.router.navigate(['/login']);
  }

 modeToggleSwitch(): void {
    this.darkModeActive = !this.darkModeActive;
      if (this.darkModeActive) {
        this.renderer.addClass(document.body, 'dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        this.renderer.removeClass(document.body, 'dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
    if (this.showProfileMenu) {
      this.showMenu = false;
    }
  }

  navigateTo(path: string): void {
    window.location.href = path;
  }

}
