import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // because of providing RecipeService here we get issue of disappearing newly added recipe 
  // from recipe-list after navigating to shopping-list component
  // because RecipeService instance get deleted as RecipeComponent get deleted after navigating to shopping-list component
  // hence provide RecipeService inside AppModule
})
export class RecipesComponent implements OnInit {
  // no need any code here because now we get selected recipe by routing

  constructor() { }

  ngOnInit(): void { }

}
