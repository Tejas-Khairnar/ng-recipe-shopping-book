import { Component, OnInit } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  // store id from route parameter by params observable
  recipeId: number;

  // inject recipe, ActivatedRoute service here
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get id from route parameter using snapshot
    // const id = this.route.snapshot.params['id']; // only works for first time when component get load

    // get id from route parameter using params observable
    // react to any changes for route params
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']; // cast string to number using +
      this.recipe = this.recipeService.getSingleRecipe(this.recipeId);
    });
  }

  // add inredients to shopping list
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
