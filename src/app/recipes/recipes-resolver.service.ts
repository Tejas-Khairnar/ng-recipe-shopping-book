import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// this type od data need to resolve
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage-service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
    // inject here because it fires http requests
    constructor(private dataStorageService: DataStorageService) { }

    // run before this route get loaded by angular automatically to remove error case of id if recipe not present
    // so always first fetch recipes from firebase before loading recipe/:id and recipe/:id/edit route
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.dataStorageService.fetchRecipesFromFirebase();
    }
}