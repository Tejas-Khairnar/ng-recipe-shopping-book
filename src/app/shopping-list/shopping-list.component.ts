import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  // store subscription in property and clean it up when component grt destroy by angular
  ingredientsChangedSub: Subscription;

  // inject shopping list service here
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    // initialize ingredients array from shopping list service array
    this.ingredients = this.shoppingListService.getIngredients();

    // get updated ingredients array from shopping list service when new ingredient et added
    this.ingredientsChangedSub = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  // edit selected item in shopping-list
  onEditItem(index: number) {
    // emit/next selected item index to inform shopping-edit component using rxjs subject
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // clean our own subscriptions here
    this.ingredientsChangedSub.unsubscribe();
  }
}
