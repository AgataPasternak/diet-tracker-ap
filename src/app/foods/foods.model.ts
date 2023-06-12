
export class Foods {
    constructor(public name: string, public id: string, public caloriesPer100g: string, public weight: number, public nutriScore: string, public tags: string, public photo: string) {}
}

export class NutriScore {
    constructor(public A: string, public B: string, public C: string, public D: string, public E: string) {}
}

export class Entity {
    constructor(public id: string) {}
}

export class Response {
    constructor(public data: Foods[], public length: number) {}
}
