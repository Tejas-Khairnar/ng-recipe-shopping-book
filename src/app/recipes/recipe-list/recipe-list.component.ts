import { Component, OnInit } from '@angular/core';

import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  // stores recipe based on Recipe blueprint
  recipes: Recipe[];

  // inject recipe, router, ActivatedRoute srvice here
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get updated recipes array using subject when new item added or existing get updated
    this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    // initialize recipes array from recipe service array
    this.recipes = this.recipeService.getRecipes();
  }

  // load new component when click on add-recipe button
  onNewRecipe() {
    // programatically navigate to other route i.e recipe-edit component
    // here we use relative route because we already on localhost:4200/recipes route
    this.router.navigate(['new'], { relativeTo: this.route }); // obje here gives current route of page then attach relative route to it
  }
}
