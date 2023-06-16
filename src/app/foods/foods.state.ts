import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, delay, take } from 'rxjs';
import { Food, Response } from './foods.model';
import { FoodsService } from './foods.service';

@Injectable({
    providedIn: 'root'
})

export class FoodsState {
    private foodsSource$ = new Subject<Response>; // można go updatować z zewnątrz (jest Subject)
    foods$ = this.foodsSource$.asObservable(); // nie da się go updatować z zewnątrz (jest Observable)

    private loadingSource$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
        return this.loadingSource$.asObservable();
    }

    private deleteProgress$ = new BehaviorSubject<boolean>(false);
    get deleteInProgress$(): Observable<boolean> {
        return this.deleteProgress$.asObservable();
    }

    private postLoading$ = new BehaviorSubject<boolean>(false);
    get postInLoading$(): Observable<boolean> {
        return this.postLoading$.asObservable();
    }

    private error$ = new BehaviorSubject<Error>(null);
    get errorMessage$(): Observable<Error> {
        return this.error$.asObservable();
    }

    private foodService = inject(FoodsService);
    private snack = inject(MatSnackBar);

    private openSnackBar(message: string, action: string) {
        this.snack.open(message, action);
    }

    getFoods(): void {
        this.loadingSource$.next(true);
        this.foodService
            .getFoods()
            .pipe(take(1), delay(1000))
            .subscribe({
                next: (data) => {
                    this.foodsSource$.next(data);
                    this.loadingSource$.next(false);
                },
                error: (error) => {
                    this.error$.next(error);
                    this.openSnackBar(error.name, 'Close');
                },
                complete: () => {
                    // define on request complete logic
                    // 'complete' is not the same as 'finalize'!!
                    // this logic will not be executed if error is fired
                }
            })
    }

    deleteFoods(id: string): void {
        this.deleteProgress$.next(true);
        this.foodService
            .deleteFoods(id)
            .pipe(delay(3000))
            .subscribe(() => {
                this.getFoods();
                this.deleteProgress$.next(false);
            })
    }

    postFood(food: Food): void { // obsługa błędów (any albo null)
        this.postLoading$.next(true);
        this.foodService
            .postFood(food)
            .pipe(take(1), delay(3000))
            .subscribe(() => {
                this.getFoods();
                this.postLoading$.next(false);
            })
    }
}
type Error = any | null; 