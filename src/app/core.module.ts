import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    // no need to exports services as they all available application wide
    providers: [
        ShoppingListService, // 1 single instance for whole project,
        RecipeService, // 1 single instance for whole project,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true // allow multiple interceptors in application
        }
    ]
})
export class CoreModule { }