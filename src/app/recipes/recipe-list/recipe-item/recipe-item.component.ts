import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from './../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // get recipe from parent component i.e recipe-list component here 
  @Input() recipe: Recipe;

  // inject recipe service here
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelectedItem() {
    // emit selected recipe here to inform its parent recipes component
    this.recipeService.selectedRecipe.emit(this.recipe);
  }

}
