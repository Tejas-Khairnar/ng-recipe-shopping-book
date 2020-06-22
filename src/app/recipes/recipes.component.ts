import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService] // 1 single instance is access here and also all its child component
})
export class RecipesComponent implements OnInit {
  // no need any code here because now we get selected recipe by routing

  constructor() { }

  ngOnInit(): void { }

}
