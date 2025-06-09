import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/ui/login/login.component';
import { PrincipalComponent } from './Principal/principal.component';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: '**', redirectTo: '/auth/login' }
];
