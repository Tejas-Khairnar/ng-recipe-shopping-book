import { Ingredient } from "../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

// initial state
const initialSate = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ]
};

// this function called by NgRx library and pass these arguments here automatically
export function ShoppingListReducer(state = initialSate, action: ShoppingListActions.AddIngredient) {
    // multiple action tyoes we may have
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                // copy previous stete here
                ...state,
                // copy previous ingredients array here
                ingredients: [...state.ingredients, action.payload]
            }
        // for first time when application reload or else part in all above cases
        default:
            return state;
    }
}