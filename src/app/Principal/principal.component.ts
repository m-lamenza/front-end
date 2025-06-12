import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppSfeIconsComponent } from '../../libs/components/app-sfe-icons/app-sfe-icons.component';
import { AuthService } from '../Auth/infrastructure/services/auth.service';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [
        CommonModule, 
        MatButtonModule, 
        MatToolbarModule, 
        MatIconModule, 
        AppSfeIconsComponent
    ],
    template: `
        <mat-toolbar color="primary">
            <span>Mi Aplicación</span>
            <span class="spacer"></span>
            <app-sfe-icons 
            icon="ic-user" 
            [scale]="24" 
            class="user-icon">
           </app-sfe-icons>
            <button mat-button (click)="logout()">Cerrar Sesión</button>
        </mat-toolbar>
        <div class="content">
            <h1>Bienvenido a la página principal</h1>
            <p>Esta es la página protegida que solo se puede ver después de iniciar sesión.</p>
        </div>
    `,
    styles: [`
        .spacer {
            flex: 1 1 auto;
        }
        .content {
            padding: 20px;
        }
        .user-icon {
            margin-right: 8px;
        }
    `]
})
export class PrincipalComponent {
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout().subscribe();
    }
} 