import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-recipe-shopping-book';

  // inject auth service here
  constructor(private authService: AuthService) { }

  // call this whenever application reloads
  ngOnInit() {
    this.authService.autoLogin();
  }
}
