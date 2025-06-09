import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthResponse, AuthCredentials, AuthUser } from '../../domain/models/auth.model';
import { OAuthConfig } from '../../domain/models/oauth.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly oauthConfig: OAuthConfig = {
        accessTokenUrl: 'https://tsso.santafe.gov.ar/service-auth/oauth2.0/accessToken',
        authUrl: 'https://tsso.santafe.gov.ar/service-auth/oauth2.0/authorize',
        clientId: 'd1sso.santafe.gov.ar.123456789',
        clientSecret: 'iCsIE7vubs4cuFoxkLSwH7b9xLzP6N7lOrz7',
        redirectUri: `${window.location.origin}/principal`,
        grantType: 'authorization_code',
        scope: '',
        profileUrl: 'https://tsso.santafe.gov.ar/service-auth/oauth2.0/profile'
    };

    private readonly SSO_LOGOUT_URL = 'https://tsso.santafe.gov.ar/service-auth/logout';
    

    constructor() {}

    login(credentials: AuthCredentials): Observable<AuthResponse> {
        console.log('AuthService: Iniciando login con SSO');
        
        // Construir los parámetros de la URL
        const params = new URLSearchParams({
            client_id: this.oauthConfig.clientId,
            scope: this.oauthConfig.scope,
            redirect_uri: this.oauthConfig.redirectUri,
            response_type: 'code',
            grant_type: this.oauthConfig.grantType,
            client_name: 'CasOAuthClient'
        });

        // Construir la URL completa del SSO
        const ssoLoginUrl = `${this.oauthConfig.authUrl}?${params.toString()}`;
        
        // Redirigir al SSO
        window.location.href = ssoLoginUrl;
        
        return of({ 
            token: '', 
            user: { 
                id: '0',
                username: '', 
                email: '',
                role: 'user'
            } 
        });
    }

    logout(): Observable<void> {
        console.log('AuthService: Iniciando proceso de logout');
        try {
            // Limpiar credenciales
            localStorage.clear();
            sessionStorage.clear();
            
            // Redirigir al SSO para cerrar sesión
            window.location.href = this.SSO_LOGOUT_URL;
            
            return of(void 0);
        } catch (error) {
            console.error('AuthService: Error durante el logout:', error);
            throw error;
        }
    }
} 