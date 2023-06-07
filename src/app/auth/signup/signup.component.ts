import { Component, OnInit } from '@angular/core';
import { AuthenticationManagementService } from 'src/app/_core/services/backend/authentication-management';
import { UserManagementService } from 'src/app/_core/services/backend/user-management.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    constructor(private userManagementService: UserManagementService,
        private authenticationManagementService: AuthenticationManagementService) {

    }
    click() {
        console.log("in");
        
        this.createUserAccount("wvnbrghllcrzy@internetkeno.com","Pass123$")
    }
    createUserAccount(userId: string, userPassword: string) {
        console.log("inside");
        
        this.authenticationManagementService.sendOtp(userId).subscribe(res => {
            console.log(res);
            console.log("creating");
            this.userManagementService.createUserAccount(userId, userPassword).subscribe(res => {
                console.log(res);
            }, err => {
                console.log(err);
            })
        }, err => {
            console.log(err);
        })

    }

    ngOnInit(): void {
    }

    temp(): void {

    }
}
