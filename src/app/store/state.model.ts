import { Ingredient } from '../shared/ingredient.model';

// state for whole application
export interface AppState {
    shoppingList: State;
}

// state for shopping list only
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}