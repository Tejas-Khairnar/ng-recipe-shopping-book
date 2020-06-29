import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  // store subscription in property and clean it up when component grt destroy by angular
  // ingredientsChangedSub: Subscription;

  // inject shopping list service here, inject Store of apllication state
  constructor(private shoppingListService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    // return observable by store.select ans stored in ingredients property
    this.ingredients = this.store.select('shoppingList');

    // initialize ingredients array from shopping list service array
    // this.ingredients = this.shoppingListService.getIngredients();

    // get updated ingredients array from shopping list service when new ingredient et added
    // this.ingredientsChangedSub = this.shoppingListService.ingredientsChanged
    //   .subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });
  }

  // edit selected item in shopping-list
  onEditItem(index: number) {
    // emit/next selected item index to inform shopping-edit component using rxjs subject
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // clean our own subscriptions here
    // this.ingredientsChangedSub.unsubscribe();
  }
}
