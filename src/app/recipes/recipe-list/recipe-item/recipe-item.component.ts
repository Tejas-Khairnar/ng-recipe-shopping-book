import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Recipe } from './../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // get recipe from parent component i.e recipe-list component here 
  @Input() recipe: Recipe;

  // define custom event emitter object for selected recipe
  @Output() selectedRecipe = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedItem() {
    // emit event emitter object here to its parent component i.e recipe list
    // type void because parent already know about selected recipe item as we get recipe by property binding
    this.selectedRecipe.emit();
  }

}
