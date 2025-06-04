import { InjectionToken } from '@angular/core';
import { IAuthContract } from './auth.contract';

export const AUTH_CONTRACT = new InjectionToken<IAuthContract>('AuthContract'); 