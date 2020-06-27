import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
/**
 * This interceptor should add token to all requests
 */
export class AuthInterceptorService implements HttpInterceptor {
    // inject auth service to get token here
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // both are observale return here so combine them to return only 1 observable at the end
        // this.authService.user.subscribe(); // this is observable
        // return next.handle(req); // this is observable

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                // for 1st req for sign up or lofin only
                if (!user) {
                    return next.handle(req);
                }
                // modify original req by attaching token as param if user present
                const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
                return next.handle(modifiedReq);
            })
        )
    }
}