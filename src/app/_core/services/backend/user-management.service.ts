import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { UserManagementClient } from '../../client/managementClient/UserManagementClient';

@Injectable({
    providedIn: 'root'
})

export class UserManagementService {

    createUserAccount(userId: string, userPassword: string){
        return from(new UserManagementClient().createUserAccount(userId, userPassword));
    }

    verifyUserAccount(userId: string, userPassword: string){
        return from(new UserManagementClient().verifyUserAccount(userId, userPassword));
    }

}