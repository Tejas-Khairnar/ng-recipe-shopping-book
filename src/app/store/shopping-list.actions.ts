import { Action } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

// store actions as constants to reduce any typo mistakes
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// action constant for adding multiple ingredients
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

// define type of action for above action ingredient constant
export class AddIngredient implements Action {
    // provided by Action and it is identifire for action
    // readonly => must not be edited from outside
    readonly type = ADD_INGREDIENT;

    // accept payload as argument in constructor
    constructor(public payload: Ingredient) { }
}

// define action for all ingredients
export class AddIngredients implements Action {
    // provided by Action and it is identifire for action
    // readonly => must not be edited from outside
    readonly type = ADD_INGREDIENTS;

    // accept ingredients array as payload
    constructor(public payload: Ingredient[]) { }
}

// return type for reducer including all actions here
export type ShoppingListActions = AddIngredient | AddIngredients;