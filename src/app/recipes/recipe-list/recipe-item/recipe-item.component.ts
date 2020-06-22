import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from './../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // get recipe from parent component i.e recipe-list component here 
  @Input() recipe: Recipe;
  // get index of selected recipe from component i.e recipe-list component here
  @Input() index: number;

  ngOnInit(): void {
  }

}
