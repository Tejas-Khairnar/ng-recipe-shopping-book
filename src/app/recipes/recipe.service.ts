import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';

// inject shopping list service inside this service
@Injectable()
export class RecipeService {
    // defines subject to inform newly added recipe as we get copy of recipe array and not update UI accordingly
    recipeChanged = new Subject<Recipe[]>();

    // stores recipe based on Recipe blueprint
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Meal',
    //         'Simple tasty meal',
    //         'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1470&q=80',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20)
    //         ]
    //     ),
    //     new Recipe(
    //         'Big Fate Burger',
    //         'What else you need to say?',
    //         'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Buns', 2)
    //         ]
    //     )
    // ];
    private recipes: Recipe[] = [];

    // inject shopping list service here, inject Store of apllication state
    constructor(private shoppingListService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

    // return recipes outside
    getRecipes() {
        // don't return original array reference outside, may cause issues
        // pass copy of original array outside using Array.slice()
        return this.recipes.slice();
    }

    // add ingredients to shopping list
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.shoppingListService.addIngredientsFromRecipe(ingredients);

        // using NgRx approach here
        // dispatch new action by passing ingredients array to store
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    // return single recipe by id/index
    getSingleRecipe(index: number) {
        return this.recipes[index];
    }

    // add new recipe to recipes array
    addNewRecipeToList(recipe: Recipe) {
        // add newly added recipe to recipes array
        this.recipes.push(recipe);
        // emit/next new copy of updated recipes array
        this.recipeChanged.next(this.recipes.slice());
    }

    // update existing selected recipe
    updateSelectedRecipeFromList(indexOfRecipe: number, newRecipe: Recipe) {
        // update existing recipe in recipes array
        this.recipes[indexOfRecipe] = newRecipe;
        // emit/next new copy of updated recipes array
        this.recipeChanged.next(this.recipes.slice());
    }

    // delete selected recipe
    deleteSelectedRecipe(index: number) {
        // delete recipe by its index and splice method of array
        this.recipes.splice(index, 1);
        // emit/next new copy of updated recipes array
        this.recipeChanged.next(this.recipes.slice());
    }

    // override all existing recipe array with new recipe array comming from firebase backend
    overrideExistingRecipesWithBackend(recipes: Recipe[]) {
        this.recipes = recipes;
        // emit/next updated recipes
        this.recipeChanged.next(this.recipes.slice());
    }
}