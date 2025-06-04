import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthRepository } from './infrastructure/repository/auth.repository';
import { AuthUseCase } from './domain/usecase/auth.usecase';
import { AUTH_CONTRACT } from './domain/contracts/auth.token';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./ui/login/login.component').then(m => m.LoginComponent)
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthUseCase,
    {
      provide: AUTH_CONTRACT,
      useClass: AuthRepository
    }
  ]
})
export class AuthModule { } 