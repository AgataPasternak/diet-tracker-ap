import { Injectable, inject } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { Foods, Response } from './foods.model';
import { FoodsService } from './foods.service';

@Injectable({
  providedIn: 'root'
})

export class FoodsState {
    // ??? --> dlaczego taki podział (chcemy updatować tylko pole prywatne, a nie publiczne)
    private foodsSource$ = new Subject<Response>;
    foods$ = this.foodsSource$.asObservable();

    private foodService = inject(FoodsService);

    getFoods(): void {
        this.foodService
            .getFoods()
            .pipe(take(1))
            .subscribe((data) => {
            this.foodsSource$.next(data);
        });
    }

    deleteFoods(id: string): void {
        this.foodService
            .deleteFoods(id);
    }

    postFoods(food: Foods): void {
        this.foodService
        .postFood(food)
        .pipe(take(1))
        .subscribe(() => {
            this.getFoods();
        })
    }
}
