import { Entity } from "../shared/models/entity.models";

export type NutriScore = "A" | "B" | "C" | "D" | "E";

export interface Food extends Entity {
    name: string;
    id: string;
    caloriesPer100g: string;
    weight: number;
    nutriScore: NutriScore;
    tags: string;
    photo: string;
}
