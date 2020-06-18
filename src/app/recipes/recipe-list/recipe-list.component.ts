import { Component, OnInit } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // stores recipe based on Recipe blueprint
  recipes: Recipe[];

  // inject recipe srvice here
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // initialize recipes array from recipe service array
    this.recipes = this.recipeService.getRecipes();
  }
}
