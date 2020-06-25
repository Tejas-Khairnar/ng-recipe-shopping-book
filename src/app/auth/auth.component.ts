import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    // flag to check if user login or not
    isLoginMode = true;

    // switch button title between login or sign up mode
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    // get form data
    onSubmit(form: NgForm) {
        console.log(form.value);
        // reset form values when we submit it
        form.reset();
    }
}