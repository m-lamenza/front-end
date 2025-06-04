import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthContract } from '../../domain/contracts/auth.contract';
import { AuthResponse, AuthCredentials, PasswordResetResponse } from '../../domain/models/auth.model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthRepository implements IAuthContract {
  private readonly API_URL = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, {});
  }

  forgotPassword(email: string): Observable<PasswordResetResponse> {
    return this.http.post<PasswordResetResponse>(`${this.API_URL}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<PasswordResetResponse> {
    return this.http.post<PasswordResetResponse>(`${this.API_URL}/reset-password`, {
      token,
      newPassword
    });
  }

  verifyToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_URL}/verify-token`, { token });
  }
} 