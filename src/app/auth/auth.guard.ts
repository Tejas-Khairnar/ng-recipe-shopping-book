import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    // inject auth service to check authentication state of user
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.user.pipe(
            // older way
            // map(user => {!!user})), // !user ? false : true
            // older approach to navigate from guard
            // tap(isAuth => {
            //     if (!isAuth) {
            //         this.router.navigate(['/auth']);
            //     }
            // }));

            // new way
            take(1), // make sure take only latest user onces this guard is run and then auto unsubscribe
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                // else return urlTree provided by angular router
                return this.router.createUrlTree(['/auth']);
            }))
    }
}