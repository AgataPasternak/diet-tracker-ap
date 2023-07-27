import { Food } from '../foods/foods.model';

export type FoodInDiary = Required<Pick<Food, "id" | "weight" | "mealType">>;

export interface DiaryEntry {
    id: string;
    date: string;
    foods: FoodInDiary[];
}

export interface DiaryResponse {
    data: DiaryEntry[];
    length: number;
}