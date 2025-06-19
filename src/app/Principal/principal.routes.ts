import { Routes } from '@angular/router';
import { PrincipalComponent } from './ui/principal/principal.component';

export const principalRoutes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: '',
        redirectTo: 'establecimientos',
        pathMatch: 'full'
      },
      {
        path: 'establecimientos',
        loadComponent: () => import('./ui/establecimientos/establecimientos.component').then(m => m.EstablecimientosComponent)
      }
    ]
  }
]; 