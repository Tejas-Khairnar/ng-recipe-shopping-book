import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // get access to form using its template reference variable
  @ViewChild('f') shoppingListForm: NgForm;

  // store our own created subscription
  subscription: Subscription;

  // flag to check form is in edit mode or not
  editMode = false;

  // store selecteditem index emitted from shopping-list component
  editedItemIndex: number;

  // storeitem which we are going to edit from shopping-list
  editedItemFromShoppingList: Ingredient;

  // inject shopping list service here
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    // get index of selected item emiting by subject from shopping-list
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItemFromShoppingList = this.shoppingListService.getSingleIngredient(index);

      // display existing form values to edit it
      this.shoppingListForm.setValue({
        name: this.editedItemFromShoppingList.name,
        amount: this.editedItemFromShoppingList.amount
      });
    });
  }

  // called when template driven form get submit
  onAddItem(form: NgForm) {
    // derived forms value
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // check mode for update existing one
    if (this.editMode) {
      // update existing ingredient to ingredient's original array in shopping list service
      this.shoppingListService.updateSelectedIngredientFromList(this.editedItemIndex, newIngredient);
    } else {
      // add newly added ingredient to ingredient's original array in shopping list service
      this.shoppingListService.addIngredient(newIngredient);
    }
  }

  // clean up our own created subscription here
  ngOnDestroy() {
    // unsubscribe to prevent it from memory leak
    this.subscription.unsubscribe();
  }

}
