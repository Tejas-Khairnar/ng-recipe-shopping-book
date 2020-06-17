import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // selected recipe from parent component i.e recipes to child component i.e recipe-detail
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
