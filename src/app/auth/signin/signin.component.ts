import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/_core/services/backend/user-management.service';
import { REGEX } from 'src/app/_shared/utils/regex';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    public signinForm: FormGroup;
    public isSigningIn: boolean = false;

    constructor(
        private userManagementService: UserManagementService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initializeSigninForm();
    }

    private initializeSigninForm(): void {
        this.signinForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    public onFormSubmit(): void {
        if (this.signinForm.valid) {
            const email: string = this.signinForm.get('email').value;
            const password: string = this.signinForm.get('password').value;
            this.verifyUserAccount(email.trim(), password.trim());
        } else {
            this.signinForm.markAllAsTouched();
        }
    }

    private verifyUserAccount(userId: string, userPassword: string): void {
        this.isSigningIn = true;
        setTimeout(() => {
            localStorage.setItem(UserManagementService.AUTH_USER, 'true');
            this.router.navigate([`${APP_ROUTES.home._}`]);
        }, 2500);
        // this.userManagementService.verifyUserAccount(userId, userPassword).subscribe((res) => {
        //     console.log(res);
        // }, err => {
        //     console.log(err);
        // });
    }
}
