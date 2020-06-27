import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // here route for first stage of app, redirect to /recipes and load RecipesComponent initially
  // pathMatch: 'full' => check specific empty route only, redirect if only full path is empty
  // pathMatch: 'prefix' => default option, include empty route in all other routes
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // localhost:4200
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // defines out above const as first level routes
  exports: [RouterModule]
})
export class AppRoutingModule { }
