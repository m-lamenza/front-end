import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <aside class="sidebar">
      <div class="sidebar__logo">
        <img src="assets/images/logos/logo-principal.svg" alt="Santa Fe Provincia" />
        <span>Ministerio de Educación</span>
      </div>
      <div class="sidebar__user">
        <img class="sidebar__avatar" src="assets/images/circle-perfil.svg" alt="Avatar" />
        <div>
          <div class="sidebar__name">Rafael Martínez</div>
          <div class="sidebar__role">Director <span class="sidebar__dropdown">▼</span></div>
        </div>
      </div>
      <nav class="sidebar__menu">
        <a class="sidebar__menu-item" (click)="navigateTo('establecimientos')">
          <span class="icon-building"></span> Establecimientos
        </a>
        <a class="sidebar__menu-item" >
          <span class="icon-user"></span> Inscripciones
        </a>
      </nav>
      <div class="sidebar__logout">
        <button class="sidebar__logout-btn" (click)="logout()">
          <span class="icon-logout"></span> Cerrar Sesión
        </button>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  
  constructor(private router: Router) {}
  
  navigateTo(route: string) {
    console.log(`Navegando a: ${route}`);
    if (route === 'establecimientos') {
      this.router.navigate(['/principal/establecimientos']);
    } else {
      // Para futuras rutas
      this.router.navigate([`/principal/${route}`]);
    }
  }
  
  logout() {
    console.log('Redirigiendo a logout...');
    window.location.href = 'https://tsso.santafe.gov.ar/service-auth/logout';
  }
} 