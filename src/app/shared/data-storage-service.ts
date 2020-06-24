// only to focus on http functionality here

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';

@Injectable({
    providedIn: 'root' // alternative for adding service in app.module providers: []
})
export class DataStoraeService {

    // inject HttpClient service here
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    // store recipe to firebase database
    storeRecipeToFirebase() {
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
}