import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

// route related to shopping list only
const shoppingListRoutes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent }, // localhost:4200/shopping-list
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(shoppingListRoutes)
    ]
})
export class ShoppingListModule { }