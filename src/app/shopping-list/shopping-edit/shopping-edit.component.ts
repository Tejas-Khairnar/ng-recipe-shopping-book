import { Component, OnInit } from '@angular/core';

import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // inject shopping list service here
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  // called when template driven form get submit
  onAddItem(form: NgForm) {
    // derived forms value
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // add newly added ingredient to ingredient's original array in shopping list service
    this.shoppingListService.addIngredient(newIngredient);
  }

}
