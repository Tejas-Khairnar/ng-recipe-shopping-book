import { Component } from '@angular/core';

import { DataStoraeService } from '../shared/data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  // inject DataStorageService for accessing http
  constructor(private dataStoraheService: DataStoraeService) { }

  // send data to firebase backend using data storage service
  onSaveDataToBackend() {
    this.dataStoraheService.storeRecipesToFirebase();
  }

  // fetch data from firebase backend using data storae service
  onFetchDataFromBackend() {
    this.dataStoraheService.fetchRecipesFromFirebase();
  }
}
