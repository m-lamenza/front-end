export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface PasswordResetResponse {
  message: string;
} 