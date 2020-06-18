import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    // inform shopping-list that new ingredient added in shopping-edit through custome event emitter object
    // its emit new ingredients array
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    // stores ingredients based on Ingredients blueprint
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    // return recipes outside
    getIngredients() {
        // don't return original array reference outside, may cause issues
        // pass copy of original array outside using Array.slice()
        return this.ingredients.slice();
    }

    // add newly added ingredient to original array
    addIngredient(ingredient: Ingredient) {
        // not work as expected because we work on copy not original array
        this.ingredients.push(ingredient);

        // emit array from this service as solution of above issue
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}