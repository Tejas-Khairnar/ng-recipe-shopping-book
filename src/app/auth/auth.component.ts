import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    // get access to place in DOM where we render alert component in DOM
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    // flag to check if user login or not
    isLoginMode = true;
    // loading indicator
    isLoading = false;
    // error message if any
    error: string = null;

    // inject auth service here
    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

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
            // call alert component here when we get an error
            this.showErrorAlert(errorMessage);
        })

        // reset form values when we submit it
        form.reset();
    }

    // close modal here
    onModalClose() {
        this.error = null;
    }

    // show alert component programatically
    private showErrorAlert(message: string) {
        // valid for TS but not works in Angular
        // const alertComp = new AlertComponent();

        // user component factory resolver to get access to component factory
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        // get access to ViewContainerRef of our host component
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        // clear everything that might be render before if any
        hostViewContainerRef.clear();

        // create our component at that place using component factory and viewContainerRef
        hostViewContainerRef.createComponent(alertComponentFactory);
    }
}