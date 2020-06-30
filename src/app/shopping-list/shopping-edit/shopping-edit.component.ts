import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../../store/shopping-list.actions';
import { ShoppingListReducer } from 'src/app/store/shopping-list.reducer';

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

  // inject shopping list service here, inject Store of apllication state
  constructor(private shoppingListService: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

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
      // this.shoppingListService.updateSelectedIngredientFromList(this.editedItemIndex, newIngredient);

      // using NgRx approach for update
      // dispatch object based on reducer update class
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.editedItemIndex, newIngredient: newIngredient }))
    } else {
      // using NgRx state management approach now, by dispatching actions here
      // dispatch object based as reducer class
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

      // add newly added ingredient to ingredient's original array in shopping list service
      // this.shoppingListService.addIngredient(newIngredient);
    }

    // change edit mode
    this.editMode = false;
    // resetting form values
    form.reset();
  }

  // clear form after adding new item or updating existing one
  onFormClear() {
    // reset form here
    this.shoppingListForm.reset();
    // change previous mode
    this.editMode = false;
  }

  // delete selected item
  onDeleteItem() {
    // delete selected item using shopping-list service
    // this.shoppingListService.deleteSelectedIngredientFromList(this.editedItemIndex);

    // NgRx approach to delete inredient
    // dispatch action based on reducer delete class
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));

    // clear the form here
    this.onFormClear();
  }

  // clean up our own created subscription here
  ngOnDestroy() {
    // unsubscribe to prevent it from memory leak
    this.subscription.unsubscribe();
  }

}
