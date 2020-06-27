import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; // required for login post response
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    // store new user data as rxjs subject
    // BehaviorSubject => also provide subscribers immedieat access to previously emmited value even if they don't subscribe at the point when that value even emitted
    user = new BehaviorSubject<User>(null);

    // inject httpClient service here
    constructor(private http: HttpClient) { }

    // sign up new user infirebase database
    signUpNewUser(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfzUsihAF9EYWzUNKZtyI1e5E6b6sk7Og',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            // error handling using rxjs operators
            catchError(this.errorHandling),
            // only allow to run some without changing actual response here
            tap(resData => {
                this.userAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    // login user after sign up process
    loginUser(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfzUsihAF9EYWzUNKZtyI1e5E6b6sk7Og',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            // error handling using rxjs operators
            catchError(this.errorHandling),
            // only allow to run some without changing actual response here
            tap(resData => {
                this.userAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    // shared error handling code for sign up and login method
    private errorHandling(errorRes: HttpErrorResponse) {
        let errorMessae = 'An unknown error occurred!!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessae);
        }
        // display appropriate error message
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessae = 'This email is exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessae = 'This email doen not exist'
                break;
            case 'INVALID_PASSWORD':
                errorMessae = 'This password is not valid'
                break;
        }
        return throwError(errorMessae);
    }

    // shared user authentication code for sign up and login method
    private userAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        // create new user here
        // new Date().getTime() => timestamp in milliseconds
        // +resData.expiresIn * 1000 => convert seconds to milliseconds
        const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationData)
        // emit/next this newly created user using rxjs subject
        this.user.next(user);
    }
}