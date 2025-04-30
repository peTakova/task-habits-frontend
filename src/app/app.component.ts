import { Component } from '@angular/core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppComponent {
showMenu = false;
darkModeActive = false;

toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

 modeToggleSwitch(): void {
    this.darkModeActive = !this.darkModeActive;

      if (this.darkModeActive) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
  }
}
