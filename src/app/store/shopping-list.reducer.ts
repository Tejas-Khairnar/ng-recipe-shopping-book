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
// ShoppingListActions.ShoppingListActions => type exported from shopping-list actions
export function ShoppingListReducer(state = initialSate, action: ShoppingListActions.ShoppingListActions) {
    // multiple action tyoes we may have
    switch (action.type) {
        // for adding single ingredient
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                // copy previous stete here
                ...state,
                // copy previous ingredients array here
                ingredients: [...state.ingredients, action.payload]
            }
        // for adding all ingredient
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                // copy previous stete here
                ...state,
                // copy previous ingredients array here
                // copy elements of payload array to new array here using spread operator
                ingredients: [...state.ingredients, ...action.payload]
            }
        // for update ingredient
        case ShoppingListActions.UPDATE_INGREDIENT:
            // get ingredient here using index provided in payload
            const ingredient = state.ingredients[action.payload.index];
            // construct updated ingredient object here
            const updatedIngredient = {
                // copy ingredient getting by index as payload
                ...ingredient,
                // copy new ingredient pass as payload and override above ingredient with new ingredient
                ...action.payload.newIngredient
            };
            // construct new updated ingredients array by coping previous state ingredients
            const updatedIngredients = [...state.ingredients];
            // update above array with new Ingredient by using index
            updatedIngredients[action.payload.index] = updatedIngredient;
            return {
                // copy previous stete here
                ...state,
                // passed new updated array of ingredients here
                ingredients: updatedIngredients
            }
        // for update ingredient
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                // copy previous stete here
                ...state,
                // just remove ingredient here by using JS Array.filter method
                ingredients: state.ingredients.filter((ingredient, index) => {
                    // payload is index here
                    return index !== action.payload;
                })
            }
        // for first time when application reload or else part in all above cases
        default:
            return state;
    }
}