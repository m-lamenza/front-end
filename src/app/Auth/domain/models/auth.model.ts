export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: string;
  telephoneNumber?: string;
  mail?: string;
  uid?: string;
  client_id?: string;
  jpegPhoto?: string;
  cuil?: string;
  givenName?: string;
  cn?: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface PasswordResetResponse {
  message: string;
} 