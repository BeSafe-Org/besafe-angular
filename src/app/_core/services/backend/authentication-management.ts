import { Injectable } from '@angular/core';
import { AuthenticationManagementClient } from '../../client/managementClient/AuthenticationManagementClient';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationManagementService {

    authenticationManagementClient: AuthenticationManagementClient
    constructor(){
        this.authenticationManagementClient = new AuthenticationManagementClient();
    }

    sendOtp(userId: string){
        return from(this.authenticationManagementClient.sendOtp(userId));
    }

    verifyOtp(userId: string, otp: string){
        return from(this.authenticationManagementClient.verifyOtp(userId, otp));
    }

}