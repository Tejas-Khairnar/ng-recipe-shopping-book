import { Action } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

// store actions as constants to reduce any typo mistakes
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// action constant for adding multiple ingredients
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

// action constant to update ingredient
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';

// action constant to update ingredient
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

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

// define action for update ingredient
export class UpdateIngredient implements Action {
    // provided by Action and it is identifire for action
    // readonly => must not be edited from outside
    readonly type = UPDATE_INGREDIENT;

    // accept info to update ingredient as payload
    constructor(public payload: { index: number, newIngredient: Ingredient }) { }
}

// define action for delete ingredient
export class DeleteIngredient implements Action {
    // provided by Action and it is identifire for action
    // readonly => must not be edited from outside
    readonly type = DELETE_INGREDIENT;

    // accept index of ingredient to delete as payload
    constructor(public payload: number) { }
}

// define action for delete ingredient

// return type for reducer including all actions here
export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;