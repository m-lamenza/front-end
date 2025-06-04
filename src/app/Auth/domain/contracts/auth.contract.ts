import { Observable } from 'rxjs';
import { AuthResponse, AuthCredentials, PasswordResetResponse } from '../models/auth.model';

export interface IAuthContract {
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  forgotPassword(email: string): Observable<PasswordResetResponse>;
  resetPassword(token: string, newPassword: string): Observable<PasswordResetResponse>;
  verifyToken(token: string): Observable<boolean>;
} 