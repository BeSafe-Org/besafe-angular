import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { APP_ROUTES, IS_USER_LOGGED_IN } from 'src/app/_shared/utils/routes';
import { UserManagementService } from '../services/backend/user-management.service';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {
    constructor(
        private router: Router,
        private userManagementService: UserManagementService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.userManagementService.isLoggedIn()) {
            return true;
        }
        else {
            return this.router.createUrlTree([APP_ROUTES.auth._]);
        }
    }

}
