import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { SignInUser, User } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  // zmienić na BehaviorSubject
  private userSource$ = new Subject<User>();
  get user$() {
    return this.userSource$.asObservable();
  }

  private isAuthenticatedSource$ = new BehaviorSubject<boolean>(false);
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSource$.asObservable();
  }

  private authService = inject(AuthService);
  private router = inject(Router);

  private ifNewUserSource$ = new BehaviorSubject<boolean>(false);
  get ifNewUser$(): Observable<boolean> {
    return this.ifNewUserSource$.asObservable();
  }

  private errorMessageSource$ = new BehaviorSubject<string>('');
  get errorMessage$(): Observable<string> {
    return this.errorMessageSource$.asObservable();
  }

  signUp(user: User): void {
    this.authService.signUp(user).subscribe({
      next: () => {
        this.ifNewUserSource$.next(true);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessageSource$.next(err.error.message);
      },
    });
  }

  signIn(user: SignInUser): void {
    this.authService.singIn(user).subscribe({
      next: () => {
        this.isAuthenticatedSource$.next(true);
        this.ifNewUserSource$.next(false);
        this.router.navigate(['/foods']);
      },
      error: (err) => {
        this.errorMessageSource$.next(err.error.message);
        this.isAuthenticatedSource$.next(false);
        this.router.navigate(['/login']);
      },
    });
  }

  signOut(): void {
    this.authService.signOut().subscribe({
      next: () => {
        this.isAuthenticatedSource$.next(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.isAuthenticatedSource$.next(false);
      },
    });
  }
}
