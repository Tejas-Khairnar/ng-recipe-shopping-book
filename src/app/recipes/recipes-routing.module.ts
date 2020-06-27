import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';


// setup routes only related to Recipes
const recipesRoutes: Routes = [
    {
        path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard],
        // here all child routes of Recipes
        children: [
            { path: '', component: RecipeStartComponent }, // localhost:4200, very first time when load
            // order of static route and dynamic route is important here to work correctlly
            { path: 'new', component: RecipeEditComponent }, // localhost:4200/recipes/new
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] }, // localhost:4200/recipes/id
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] } // localhost:4200/recipes/id/edit
        ]
    }, // localhost:4200/recipes
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }