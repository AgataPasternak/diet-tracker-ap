import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, delay, take } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';
import { Food } from './foods.model';
import { FoodsService } from './foods.service';

@Injectable({
    providedIn: 'root'
})

export class FoodsState {
    private foodsSource$ = new Subject<ApiResponse<Food>>; // można go updatować z zewnątrz (jest Subject)
    foods$ = this.foodsSource$.asObservable(); // nie da się go updatować z zewnątrz (jest Observable)

    private foodSource$ = new Subject<Food>();
    food$ = this.foodSource$.asObservable();

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

    private error$ = new BehaviorSubject<Error>(null); // interceptory do obsługi błędów
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
            .pipe(take(1), delay(100))
            .subscribe({
                next: (data) => {
                    this.foodsSource$.next(data);
                    this.loadingSource$.next(false); // reset errora this.error$.next(null);
                },
                error: (error) => {
                    this.error$.next(error);
                    this.openSnackBar(error.name, 'Close'); // wyłączyć loader
                },
                complete: () => {
                    // define on request complete logic
                    // 'complete' is not the same as 'finalize'!!
                    // this logic will not be executed if error is fired
                }
            })
    }

    deleteFoods(id: string): void { // dodac obsługe błędów (any albo null)
        this.deleteProgress$.next(true);
        this.foodService
            .deleteFoods(id)
            .pipe(delay(100))
            .subscribe(() => {
                this.getFoods();
                this.deleteProgress$.next(false);
            })
    }

    postFood(food: Food): void { // obsługa błędów (any albo null)
        this.postLoading$.next(true);
        this.foodService
            .postFood(food)
            .pipe(take(1), delay(1000))
            .subscribe(() => {
                this.getFoods();
                this.postLoading$.next(false);
            })
    }

    searchFood(filterValue: string): void {
        this.foodService
            .searchFood(filterValue)
            .subscribe((data) => {
                this.foodsSource$.next(data);
            })
    }

    getFoodById(id: string): void {
        this.foodService.getFoodsById(id).subscribe((data) => {
            this.foodSource$.next(data);
        })
    }

    updateFood(food: Food): void {
        this.foodService.updateFood(food).subscribe(() => {
            // ??? jak to działa
            this.getFoods();
        })
    }
}
type Error = any | null; 