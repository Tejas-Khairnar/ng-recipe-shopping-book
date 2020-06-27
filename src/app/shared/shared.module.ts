import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    // always export shared used components, modules to use inside other modules
    exports: [
        CommonModule,
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    entryComponents: [
        AlertComponent // automatically added by angular through programatical instructions
    ],
})
export class SharedModule { }