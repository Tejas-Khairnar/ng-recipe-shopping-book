import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // recieve newly added ingredient from child component i.e shopping-edit to here using event binding
  onIngredientAdded($ingredientFromShopEdit: Ingredient) {
    this.ingredients.push($ingredientFromShopEdit);
  }

}
