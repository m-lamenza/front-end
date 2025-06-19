import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './Principal/ui/principal/principal.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'principal',
    component: PrincipalComponent
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 