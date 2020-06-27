import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

    // inject ViewContainerRef => gives access of place/pointer where this directive sits in DOM
    constructor(public viewContainerRef: ViewContainerRef) { }
}