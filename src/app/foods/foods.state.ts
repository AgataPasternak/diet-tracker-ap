import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
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

    private foodService = inject(FoodsService);

    getFoods(): void {
        this.loadingSource$.next(true);
        this.foodService
            .getFoods()
            .pipe(take(1))
            .subscribe((data) => {
                this.foodsSource$.next(data);
                this.loadingSource$.next(false);
            });
    }

    deleteFoods(id: string): void { // dodać loading
        this.foodService
            .deleteFoods(id)
            .subscribe(() => {
                this.getFoods();
            })
    }

    postFood(food: Foods): void { // dodać loading + obsługa błędów (any albo null)
        this.foodService
            .postFood(food)
            .pipe(take(1))
            .subscribe(() => {
                this.getFoods();
            })
    }
}
type Error = any | null; // tu Subject , dwa pola prv i publi, metody get i set - analogicznie do tego co było 