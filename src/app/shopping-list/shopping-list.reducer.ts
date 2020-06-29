import { Ingredient } from "../shared/ingredient.model";

// initial state
const initialSate = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ]
};

// this function called by NgRx library and pass these arguments here automatically
export function ShoppingListReducer(state = initialSate, action) {

}