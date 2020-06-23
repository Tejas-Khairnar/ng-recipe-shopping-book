import { Component, OnInit } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  // store id from route parameter by params observable
  recipeId: number;

  // inject recipe, ActivatedRoute, router service here
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // get id from route parameter using snapshot
    // const id = this.route.snapshot.params['id']; // only works for first time when component get load

    // get id from route parameter using params observable
    // react to any changes for route params
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']; // cast string to number using +
      this.recipe = this.recipeService.getSingleRecipe(this.recipeId);
    });
  }

  // add inredients to shopping list
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  // load new component i.e recipe-edit when click on edit-recipe button
  onEditRecipe() {
    // programatically load recipe-edit component here
    // this.router.navigate(['edit'], { relativeTo: this.route }); // we are already on localhost:4200/recipes/id then append relative route to it i.e edit

    // alternative to above approach
    this.router.navigate(['../', this.recipeId, 'edit'], { relativeTo: this.route }); // configure route to navigate to recipe-edit component with all route parameters
  }

  // delete selected recipe
  onDeleteRecipe() {
    this.recipeService.deleteSelectedRecipe(this.recipeId);
  }

}
