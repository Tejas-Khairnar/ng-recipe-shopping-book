import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  // inject shopping list service here
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    // initialize ingredients array from shopping list service array
    this.ingredients = this.shoppingListService.getIngredients();

    // get updated ingredients array from shopping list service when new ingredient et added
    this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }
}
