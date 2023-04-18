import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { APP_ROUTES, IS_USER_LOGGED_IN } from 'src/app/_shared/utils/routes';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (IS_USER_LOGGED_IN) {
            return true;
        }
        else {
            return this.router.createUrlTree([APP_ROUTES.auth._]);
        }
    }

}
