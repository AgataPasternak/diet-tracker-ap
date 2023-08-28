import { Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})

export class LoginState {
    private loginService = inject(LoginService);
    private token: string;



}
