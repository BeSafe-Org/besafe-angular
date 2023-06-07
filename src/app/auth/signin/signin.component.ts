import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/_core/services/backend/user-management.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    constructor(private userManagementService: UserManagementService)  { }

    ngOnInit(): void {
    }
    click(){
        console.log("hii");
        
        this.verifyUserAccount("wvnbrghllcrzy@internetkeno.com","Pass123$")
    }
    verifyUserAccount(userId: string, userPassword: string){
        this.userManagementService.verifyUserAccount(userId, userPassword).subscribe((res)=>{
            console.log(res );
        },err=>{
            console.log(err);
        })
    }

    temp(): void {
        console.log('clicked');
    }
}
