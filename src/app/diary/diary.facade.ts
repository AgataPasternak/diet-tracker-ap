import { Injectable } from '@angular/core';
import { Food } from '../foods/foods.model';
import { ApiResponse } from '../shared/models/api-response.model';
import { DiaryEntry, FlattenDiaryEntry } from './diary.model';

@Injectable({
    providedIn: 'root'
})
export class DiaryFacadeService {
    flattenData(response: ApiResponse<DiaryEntry>, dataFoods: ApiResponse<Food>): FlattenDiaryEntry[] {
        const flattenedData: FlattenDiaryEntry[] = [];
        response.data.map((entry) => {
          entry.foods.map((food) => {
            const foodInfo = dataFoods.data.find(f => f.id === food.id);
            if (foodInfo) {
              const caloriesConsumed = (food.weight / 100) * +foodInfo.caloriesPer100g;
              flattenedData.push({
                id: entry.id,
                date: entry.date,
                foodId: food.id,
                weight: food.weight,
                mealType: food.mealType,
                calories: caloriesConsumed.toFixed(2),
                uniqueFoodId: food.uniqueFoodId,
                food_id: food.food_id
              });
            }
          });
        });
        return flattenedData;
      }
}
