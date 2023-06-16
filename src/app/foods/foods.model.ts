interface Entity {
    id: string;
}
type NutriScore = "A" | "B" | "C" | "D" | "E";

export interface Foods extends Entity {
    name: string;
    id: string;
    caloriesPer100g: string;
    weight: number;
    nutriScore: NutriScore;
    tags: string;
    photo: string;
}

export interface Response {
    data: Foods[];
    length: number;
}
