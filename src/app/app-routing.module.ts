import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';


const routes: Routes = [
  // here route for first stage of app, redirect to /recipes and load RecipesComponent initially
  // pathMatch: 'full' => check specific empty route only, redirect if only full path is empty
  // pathMatch: 'prefix' => default option, include empty route in all other routes
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // localhost:4200
  // here the main routes for components in app
  {
    path: 'recipes', component: RecipesComponent,
    // here all child routes of Recipes
    children: [
      { path: '', component: RecipeStartComponent }, // localhost:4200, very first time when load
      // order of static route and dynamic route is important here to work correctlly
      { path: 'new', component: RecipeEditComponent }, // localhost:4200/recipes/new
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] }, // localhost:4200/recipes/id
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] } // localhost:4200/recipes/id/edit
    ]
  }, // localhost:4200/recipes
  { path: 'shopping-list', component: ShoppingListComponent } // localhost:4200/shopping-list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // defines out above const as first level routes
  exports: [RouterModule]
})
export class AppRoutingModule { }
