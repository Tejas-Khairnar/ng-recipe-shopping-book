import { Component } from '@angular/core';

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
}