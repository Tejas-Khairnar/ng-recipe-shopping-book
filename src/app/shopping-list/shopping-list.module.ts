import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';

// route related to shopping list only
const shoppingListRoutes: Routes = [
    // empty this path here and add it to app-routing module to load this module lazily
    { path: '', component: ShoppingListComponent }, // localhost:4200/shopping-list
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(shoppingListRoutes)
    ]
})
export class ShoppingListModule { }