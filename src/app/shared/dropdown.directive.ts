import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]' // directive always has attribute selector
})
export class DropdownDirective {
    // to bind property of element dynamically on which this directive sits
    // class.open => css property of that element
    @HostBinding('class.open') isOpen = false;

    // to react event happens on element on which this directive sits
    // click => HTML event of that element
    @HostListener('click') toggleOpenClass() {
        this.isOpen = !this.isOpen;
    }
}