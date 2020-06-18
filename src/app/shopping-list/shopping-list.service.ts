import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
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
        this.ingredients.push(ingredient);
    }
}