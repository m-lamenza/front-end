import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../infrastructure/services/auth.service';
import { AuthCredentials } from '../../domain/models/auth.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule],
    template: `
        <div class="login-container">
            <mat-card class="login-card">
                <mat-card-header>
                    <mat-card-title>Redirigiendo al SSO...</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                    <p>Por favor espere mientras lo redirigimos al sistema de autenticación.</p>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [`
        .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f5f5f5;
        }
        .login-card {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            text-align: center;
        }
    `]
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit() {
        // Redirigir automáticamente al SSO
        this.authService.login({ username: '', password: '' }).subscribe();
    }
} 