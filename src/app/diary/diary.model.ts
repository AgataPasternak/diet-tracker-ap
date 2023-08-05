import { Food } from "../foods/foods.model";
import { ApiResponse } from "../shared/models/api-response.model";

export type MealType = 'breakfast' | 'secondBreakfast' | 'lunch' | 'afternoonTea' | 'dinner';

export interface DiaryEntry {
    id: string;
    date: string;
    foods: FoodInDiary[];
}

export interface FoodInDiary {
    id: Food['id'];
    weight: number;
    mealType: MealType;
}

const DiaryResponse: ApiResponse<DiaryEntry> = {
    data: [
        { id: '1', date: '2021-01-01', foods: [{ id: '1', weight: 100, mealType: 'breakfast' }] },
        { id: '2', date: '2021-01-02', foods: [{ id: '2', weight: 100, mealType: 'breakfast' }] },
    ],
    length: 2
}