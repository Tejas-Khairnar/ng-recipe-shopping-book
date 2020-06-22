import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

// inject shopping list service inside this service
@Injectable()
export class RecipeService {
    // define selected recipe as event emitter object for cross component communication
    selectedRecipe = new EventEmitter<Recipe>();

    // stores recipe based on Recipe blueprint
    private recipes: Recipe[] = [
        new Recipe(
            'Meal',
            'Simple tasty meal',
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1470&q=80',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            'Big Fate Burger',
            'What else you need to say?',
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Buns', 2)
            ]
        )
    ];

    // inject shopping list service here
    constructor(private shoppingListService: ShoppingListService) { }

    // return recipes outside
    getRecipes() {
        // don't return original array reference outside, may cause issues
        // pass copy of original array outside using Array.slice()
        return this.recipes.slice();
    }

    // add ingredients to shopping list
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredientsFromRecipe(ingredients);
    }

    // return single recipe by id/index
    getSingleRecipe(index: number) {
        return this.recipes[index];
    }
}