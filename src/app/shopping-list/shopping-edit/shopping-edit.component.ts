import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // select DOM HTML element directly in component using local reference variable here
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  // inject shopping list service here
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  // called when click add item button
  onAddItem() {
    // construct new Ingredient object based on user input
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    // add newly added ingredient to ingredient's original array in shopping list service
    this.shoppingListService.addIngredient(newIngredient);
  }

}
