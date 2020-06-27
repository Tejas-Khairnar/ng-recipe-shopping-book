// only to focus on http functionality here

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root' // alternative for adding service in app.module providers: []
})
export class DataStorageService {

    // inject HttpClient service here
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    // store all recipe to firebase database
    storeRecipesToFirebase() {
        // get recipes array from recipe service
        const recipes = this.recipeService.getRecipes();
        // this.http.post => to store 1 recipe
        // this.http.put => to store all recipes and override all previous entries there
        // put is provided by backend you use, not provided by all but firebase provide it
        this.http.put('https://ng-recipe-shopping-book-df269.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response); // this res is not needed in any component so subscribe here
            });
    }

    // fetch all recipes from firebase
    fetchRecipesFromFirebase() {
        return this.http.get<Recipe[]>('https://ng-recipe-shopping-book-df269.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        // if ingredients not present then add as empty array
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    })
                }),
                tap(recipes => {
                    this.recipeService.overrideExistingRecipesWithBackend(recipes);
                }))
    }
}