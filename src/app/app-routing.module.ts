import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  // here route for first stage of app, redirect to /recipes and load RecipesComponent initially
  // pathMatch: 'full' => check specific empty route only, redirect if only full path is empty
  // pathMatch: 'prefix' => default option, include empty route in all other routes
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }, // localhost:4200

  // routes for lazy loading our other feature modules in application here
  // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' } // older approach
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) }, // new approach
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  // 2nd argument to tell angular preload all modules as fast as possible inspite having lazy load
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], // defines out above const as first level routes
  exports: [RouterModule]
})
export class AppRoutingModule { }
