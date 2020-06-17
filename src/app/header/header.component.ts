import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // define custome event emitter object of type string
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    // emit selected feature commit from DOM selection to parent component through featureSelected object
    this.featureSelected.emit(feature);
  }
}
