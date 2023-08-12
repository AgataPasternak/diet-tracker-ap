import { Pipe, PipeTransform, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Food } from './foods/foods.model';
import { FoodsState } from './foods/foods.state';

@Pipe({
  name: 'foodIdToName'
})
export class FoodIdToNamePipe implements PipeTransform {

  foodsState = inject(FoodsState);

  foods$ = this.foodsState.foods$;

  transform(foodId: string): Observable<String | undefined> {
    return this.foods$.pipe(
      map((foods) => {
        return foods.data.find((food: Food) => {
          return food?.id === foodId;
        })?.name;
      })
    );
  }

}
