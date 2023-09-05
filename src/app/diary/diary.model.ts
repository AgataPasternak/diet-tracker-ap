import { Food } from "../foods/foods.model";

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface DiaryEntry {
    id?: string;
    date: string;
    foods: FoodInDiary[];
}

export interface FoodInDiary {
    id: Food['id'];
    weight: number;
    mealType: MealType;
    uniqueFoodId: string;
    food_id: string;
}

export interface FlattenDiaryEntry {
    id: string | undefined,
    date: string,
    foodId: string,
    weight: number,
    mealType: MealType,
    calories: string
}