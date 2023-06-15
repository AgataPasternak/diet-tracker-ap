import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, take } from 'rxjs';
import { Foods, Response } from './foods.model';
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

    private foodService = inject(FoodsService);

    getFoods(): void {
        this.loadingSource$.next(true);
        this.foodService
            .getFoods()
            .pipe(take(1), delay(1000))
            .subscribe((data) => {
                this.foodsSource$.next(data);
                this.loadingSource$.next(false);
            });
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

    postFood(food: Foods): void { // obsługa błędów (any albo null)
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
type Error = any | null; // tu Subject , dwa pola prv i publi, metody get i set - analogicznie do tego co było 