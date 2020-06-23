import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    // inform shopping-list that new ingredient added in shopping-edit through rxjs subject
    // its emit(next) new ingredients array
    ingredientsChanged = new Subject<Ingredient[]>();

    // inform shopping-edit component which item index get selected from shopping-list component
    startedEditing = new Subject<number>();

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

        // emit(next) array from this service as solution of above issue
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // add ingredients from recipe service
    addIngredientsFromRecipe(ingredients: Ingredient[]) {
        // solution 1 => but may lots ofevent emition here
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // return single ingredient
    getSingleIngredient(index: number) {
        return this.ingredients[index];
    }

    // update selected ingredient
    updateSelectedIngredientFromList(indexOfIngredient: number, newIngredientValues: Ingredient) {
        // update existing ingredient entry
        this.ingredients[indexOfIngredient] = newIngredientValues;
        // emit/next updated ingredients array
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    // delete selected ingredient
    deleteSelectedIngredientFromList(indexOfIngredient: number) {
        // delete 1 item from ingredients array using splice
        this.ingredients.splice(indexOfIngredient, 1);
        // emit/next updated ingredients array
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}