import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, from } from 'rxjs';
import { UserManagementClient } from '../../client/managementClient/UserManagementClient';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {
    public static AUTH_USER = "masterKey";

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    createUserAccount(userId: string, userPassword: string) {
        return from(new UserManagementClient().createUserAccount(userId, userPassword));
    }

    verifyUserAccount(userId: string, userPassword: string) {
        return from(new UserManagementClient().verifyUserAccount(userId, userPassword));
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem(UserManagementService.AUTH_USER)) {
                return true;
            }
        }
        return false;
    }
}
