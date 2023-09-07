import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthState } from "./auth.state";

export const isUserLoggedInGuard = () => {
    const authState = inject(AuthState);
    const router = inject(Router);
    return authState.isAuthenticated$.pipe(
        tap(isAuthenticated => {
            console.log('isAuthenticated', isAuthenticated);
            !!isAuthenticated || router.navigate(['/login']);
        })
    );
};