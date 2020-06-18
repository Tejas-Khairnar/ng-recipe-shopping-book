import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // define custome event emitter object of type Recipe
  @Output() selectedRecipeFromRecipeList = new EventEmitter<Recipe>();

  // stores recipe based on Recipe blueprint
  recipes: Recipe[] = [
    new Recipe('Test', 'Simple recipe', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1470&q=80'),
    new Recipe('Test', 'Simple recipe', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1470&q=80')
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // get selected recipe from child component i.e recipe-item to here by event binding
  onRecipeSelected(recipeFromRecipeItem: Recipe) {
    // emit recipe selected from recipe item component to recipes component
    this.selectedRecipeFromRecipeList.emit(recipeFromRecipeItem);
  }

}
