import { Injectable, Inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { IAuthContract } from '../dao/auth.contract';
import { AuthResponse, PasswordResetResponse } from '../models/auth.model';
import { AUTH_CONTRACT } from '../dao/auth.token';

@Injectable()
export class AuthUseCase {
  constructor(@Inject(AUTH_CONTRACT) private authContract: IAuthContract) {}

  login(username: string, password: string): Observable<AuthResponse | null> {
    return this.authContract.login({ username, password }).pipe(
      catchError(() => of(null))
    );
  }

  logout(): Observable<void> {
    return this.authContract.logout().pipe(
      catchError((error) => {
        console.error('Error en logout:', error);
        return of(void 0);
      })
    );
  }

  forgotPassword(email: string): Observable<string> {
    return this.authContract.forgotPassword(email).pipe(
      map((response: PasswordResetResponse) => response.message),
      catchError(() => {
        throw new Error('Error al procesar la recuperación de contraseña');
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<string> {
    return this.authContract.resetPassword(token, newPassword).pipe(
      map((response: PasswordResetResponse) => response.message),
      catchError(() => {
        throw new Error('Error al restablecer la contraseña');
      })
    );
  }

  verifyToken(token: string): Observable<boolean> {
    return this.authContract.verifyToken(token).pipe(
      catchError(() => of(false))
    );
  }
} 