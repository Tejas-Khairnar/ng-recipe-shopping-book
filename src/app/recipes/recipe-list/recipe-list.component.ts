import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // define custome event emitter object of type Recipe
  @Output() selectedRecipeFromRecipeList = new EventEmitter<Recipe>();

  // stores recipe based on Recipe blueprint
  recipes: Recipe[];

  // inject recipe srvice here
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // initialize recipes array from recipe service array
    this.recipes = this.recipeService.getRecipes();
  }

  // get selected recipe from child component i.e recipe-item to here by event binding
  onRecipeSelected(recipeFromRecipeItem: Recipe) {
    // emit recipe selected from recipe item component to recipes component
    this.selectedRecipeFromRecipeList.emit(recipeFromRecipeItem);
  }

}
