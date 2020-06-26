import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
            catchError(this.errorHandling)
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
            catchError(this.errorHandling)
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
}