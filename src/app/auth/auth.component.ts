import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    // flag to check if user login or not
    isLoginMode = true;
    // loading indicator
    isLoading = false;
    // error message if any
    error: string = null;

    // inject auth service here
    constructor(private authService: AuthService, private router: Router) { }

    // switch button title between login or sign up mode
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    // get form data
    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        // extracting form inputs here
        const email = form.value.email;
        const password = form.value.password;

        // start loading spinner here
        this.isLoading = true;

        // outsource subcription blocks for sign up and login
        let authOservable: Observable<AuthResponseData>;

        // check mode login or sign up here
        if (this.isLoginMode) {
            // login user here
            authOservable = this.authService.loginUser(email, password);
        } else {
            // sign new user here
            authOservable = this.authService.signUpNewUser(email, password);
        }

        // subscribing auth observable only for 1 time for both sign up and login
        authOservable.subscribe(resData => {
            console.log(resData);
            // stop loading spinner here
            this.isLoading = false;
            // on successfull login redirect user to recipes page
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            // stop loading spinner here
            this.isLoading = false;
            this.error = errorMessage;
        })

        // reset form values when we submit it
        form.reset();
    }
}