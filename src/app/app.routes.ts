import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/ui/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { 
      path: 'principal', 
      loadChildren: () => import('./Principal/principal.routes').then(m => m.principalRoutes)
    },
    { path: '**', redirectTo: '/auth/login' }
];
