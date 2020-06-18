import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // selected recipe from parent component i.e recipes to child component i.e recipe-detail
  @Input() recipe: Recipe;

  // inject recipe service here
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  // add inredients to shopping list
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

}
