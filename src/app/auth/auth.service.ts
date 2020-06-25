import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
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
        );
    }
}