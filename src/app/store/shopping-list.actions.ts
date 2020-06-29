import { Action } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';

// store actions as constants to reduce any typo mistakes
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

// define type of action for above action constant
export class AddIngredient implements Action {
    // provided by Action and it is identifire for action
    // readonly => must not be edited from outside
    readonly type = ADD_INGREDIENT;
    readonly payload: Ingredient
}