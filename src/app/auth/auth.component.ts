import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    // flag to check if user login or not
    isLoginMode = true;

    // inject auth service here
    constructor(private authService: AuthService) { }

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

        // check mode login or sign up here
        if (this.isLoginMode) {
            // login user here
            // ...
        } else {
            // sign new user here
            this.authService.signUpNewUser(email, password).subscribe(resData => {
                console.log(resData);
            }, error => {
                console.log(error);
            });
        }

        // reset form values when we submit it
        form.reset();
    }
}