// model for recipe => just blueprint for object we create

import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string; // url from web
    public ingredients: Ingredient[];

    // need to instantiate obj with new keyword
    constructor(name: string, desc: string, imagePAth: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePAth;
        this.ingredients = ingredients;
    }
}