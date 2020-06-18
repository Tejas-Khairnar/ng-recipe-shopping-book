import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService] // 1 single instance is access here and also all its child component
})
export class RecipesComponent implements OnInit {
  selectedRecipeFromRecipeItem: Recipe;

  // inject recipe service here
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // listen to selected recipe emitted from recipe-item to here
    this.recipeService.selectedRecipe
      .subscribe((recipe: Recipe) => {
        this.selectedRecipeFromRecipeItem = recipe;
      });
  }

}
