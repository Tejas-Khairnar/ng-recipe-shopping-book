import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage-service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // flag to check user is authenticated or not
  isUserAuthenticated = false;
  // store user subscription
  private userSub: Subscription;

  // inject DataStorageService for accessing http
  constructor(private dataStoraheService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      // user either null(not login) or object(on login)
      this.isUserAuthenticated = !!user; // same as !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }

  // send data to firebase backend using data storage service
  onSaveDataToBackend() {
    this.dataStoraheService.storeRecipesToFirebase();
  }

  // fetch data from firebase backend using data storae service
  onFetchDataFromBackend() {
    this.dataStoraheService.fetchRecipesFromFirebase().subscribe();
  }

  // destroy our own subscription here
  ngOnDestroy() {
    // cleanup work 
    this.userSub.unsubscribe();
  }
}
