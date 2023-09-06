import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { SignInUser, User } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthState {
    private userSource$ = new Subject<User>;
    get user$() {
       return this.userSource$.asObservable();
    }

  private authService = inject(AuthService);

    signUp(user: User): void {
        this.authService.signUp(user)
            .subscribe(() => {
                console.log('User created successfully');
            });
    }

    signIn(user: SignInUser): void {
        this.authService.singIn(user)
            .subscribe(() => {
                console.log('User logged in successfully');
                //localStorage.setItem('token', user.token);
                //this.userSource$.next(user);
            });
    }
}

