import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-recipe-shopping-book';
  loadedFeature = 'recipes';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
