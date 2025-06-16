import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppSfeIconsComponent } from '../../libs/components/app-sfe-icons/app-sfe-icons.component';
import { AuthService } from '../Auth/infrastructure/services/auth.service';
import { AppSfeButtonComponent } from 'src/libs/components/app-sfe-button/app-sfe-button.component';
import { SfeInputComponent } from 'src/libs/components/sfe-input/sfe-input.component';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [
        CommonModule, 
        MatButtonModule, 
        MatToolbarModule, 
        MatIconModule, 
        AppSfeIconsComponent,
        AppSfeButtonComponent,
        SfeInputComponent
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
            <app-sfe-button>Continuar</app-sfe-button> <br><br>
            <app-sfe-button size="sm">Continuar</app-sfe-button> <br><br>
            <app-sfe-button size="sm" [disabled]="true">Continuar</app-sfe-button> <br><br>
            <p>input desabilitado</p><br>
            <app-sfe-input width="559" [disabled]="true" placeholder="Buscar (Nombre o DNI)" /> <br><br>
            <p>input normal</p><br>
            <app-sfe-input width="559" placeholder="Ingrese datos" 
              (onInput)="onInput($event)"/>
            <p>resultado: {{valInput}}</p><br>
            <p>input busqueda</p><br>
            <app-sfe-input icon="ic-search" [search]="true" width="559" placeholder="Buscar (Nombre o DNI)" 
              (onInput)="onSearch($event)"/>
            <p>resultado: {{valSearch}}</p><br>
             <p>input busqueda enter</p><br>
            <app-sfe-input icon="ic-search" [enterSearch]="true" width="559" placeholder="Buscar (Nombre o DNI)" 
              (onInput)="onSearchEnter($event)"/>
            <p>resultado: {{valSearchEnter}}</p><br>
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
        p {
           margin: 0;
        }    
    `]
})
export class PrincipalComponent {
    valSearch = '';
    valInput = '';
    valSearchEnter = '';
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout().subscribe();
    }

    onSearch(ev: any){
      this.valSearch = ev;
    }

    onInput(ev: any){
        this.valInput = ev;
    }

    onSearchEnter(ev: any){
        this.valSearchEnter = ev;
    }
} 