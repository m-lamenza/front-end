import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
    

    constructor() {
        console.log('AuthService: Constructor inicializado');
        // Verificar si hay código en la URL al iniciar
        this.checkForAuthCode();
    }

    private checkForAuthCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
            console.log('AuthService: Código encontrado al iniciar:', code);
            this.handleAuthCode(code);
        }
    }

    private async getAccessToken(code: string): Promise<string> {
        const params = new URLSearchParams({
            grant_type: this.oauthConfig.grantType,
            client_id: this.oauthConfig.clientId,
            client_secret: this.oauthConfig.clientSecret,
            code: code,
            redirect_uri: this.oauthConfig.redirectUri
        });

        try {
            const response = await fetch(this.oauthConfig.accessTokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            if (!response.ok) {
                throw new Error('Error al obtener el token de acceso');
            }

            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error('AuthService: Error al obtener el token de acceso:', error);
            throw error;
        }
    }

    private async handleAuthCode(code: string) {
        console.log('AuthService: Procesando código de autorización:', code);
        
        try {
            const accessToken = await this.getAccessToken(code);
            console.log('AuthService: Token de acceso obtenido:', accessToken);
            
            // Guardamos el token de acceso
            localStorage.setItem('accessToken', accessToken);
            
            // Crear el objeto de usuario básico
            const user: AuthUser = {
                id: '0',
                username: 'usuario_sso',
                email: 'usuario@sso.com',
                role: 'user'
            };
            
   
            localStorage.setItem('user', JSON.stringify(user));
            console.log('AuthService: Usuario guardado en localStorage:', localStorage.getItem('user'));
            

            localStorage.setItem('token', accessToken);
            console.log('AuthService: Token guardado en localStorage:', localStorage.getItem('token'));
            

            console.log('AuthService: Resumen de datos guardados:', {
                auth_code: code,
                user: JSON.parse(localStorage.getItem('user') || '{}'),
                token: localStorage.getItem('token')
            });

            // Limpia  la URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
            console.error('AuthService: Error al procesar el código de autorización:', error);
        }
    }

    login(credentials: AuthCredentials): Observable<AuthResponse> {
        console.log('AuthService: Iniciando login con SSO');
        console.log('AuthService: URL actual:', window.location.href);
        
        // Verificar si ya tenemos un código de autorización
        const urlParams = new URLSearchParams(window.location.search);
        
        const code = urlParams.get('code');
        console.log('AuthService: Código encontrado:', code);
        
        if (code) {
            this.handleAuthCode(code);
            return of({
                token: localStorage.getItem('token') || '',
                user: JSON.parse(localStorage.getItem('user') || '{}')
            });
        }
        
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

            console.log('AuthService: Datos antes de logout:', {
                auth_code: localStorage.getItem('auth_code'),
                user: localStorage.getItem('user'),
                token: localStorage.getItem('token')
            });
            

            localStorage.clear();
            sessionStorage.clear();

            console.log('AuthService: Datos después de logout:', {
                auth_code: localStorage.getItem('auth_code'),
                user: localStorage.getItem('user'),
                token: localStorage.getItem('token')
            });
            
            // Redirigir al SSO para cerrar sesión
            window.location.href = this.SSO_LOGOUT_URL;
            
            return of(void 0);
        } catch (error) {
            console.error('AuthService: Error durante el logout:', error);
            throw error;
        }
    }
} 