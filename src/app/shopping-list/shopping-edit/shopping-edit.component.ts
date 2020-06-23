import { Component, OnInit, OnDestroy } from '@angular/core';
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
  // store our own created subscription
  subscription: Subscription;

  // flag to check form is in edit mode or not
  editMode = false;

  // store selecteditem index emitted from shopping-list component
  editedItemIndex: number;

  // inject shopping list service here
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    // get index of selected item emiting by subject from shopping-list
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
    });
  }

  // called when template driven form get submit
  onAddItem(form: NgForm) {
    // derived forms value
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // add newly added ingredient to ingredient's original array in shopping list service
    this.shoppingListService.addIngredient(newIngredient);
  }

  // clean up our own created subscription here
  ngOnDestroy() {
    // unsubscribe to prevent it from memory leak
    this.subscription.unsubscribe();
  }

}
