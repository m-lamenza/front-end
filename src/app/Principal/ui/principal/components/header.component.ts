import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  template: `
    <header class="header">
      <div class="header__greeting">
        Buenos días, <span class="header__name">Rafael</span>
      </div>
      <div class="header__actions">
        <button class="header__icon-btn"><span class="icon-bell"></span></button>
        <button class="header__icon-btn"><span class="icon-apps"></span></button>
      </div>
    </header>
  `
})
export class HeaderComponent {} 