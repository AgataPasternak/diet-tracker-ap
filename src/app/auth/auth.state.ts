import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SignInUser, User } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
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

  signUp(user: User): void {
    this.authService.signUp(user).subscribe({
      next: () => {
        this.ifNewUserSource$.next(true);
        this.router.navigate(['/login']);
      },
      error: (err) => {},
    });
  }

  signIn(user: SignInUser): void {
    this.authService.singIn(user).subscribe({
      next: () => {
        this.isAuthenticatedSource$.next(true);
        this.router.navigate(['/foods']);
      },
      error: () => {
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
