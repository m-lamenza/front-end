import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthUseCase } from '../../domain/usecase/auth.usecase';
import { AuthRepository } from '../../infrastructure/repository/auth.repository';
import { AUTH_CONTRACT } from '../../domain/contracts/auth.token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthUseCase,
    { provide: AUTH_CONTRACT, useClass: AuthRepository }
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authUseCase: AuthUseCase,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    try {
      const { username, password } = this.loginForm.value;
      const success = await this.authUseCase.login(username, password);
      if (!success) {
        this.error = 'Usuario o contraseña incorrectos';
      }
    } catch {
      this.error = 'Error al iniciar sesión';
    } finally {
      this.loading = false;
    }
  }
} 