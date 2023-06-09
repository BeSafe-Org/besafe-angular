import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationManagementService } from 'src/app/_core/services/backend/authentication-management';
import { UserManagementService } from 'src/app/_core/services/backend/user-management.service';
import { ToasterService } from 'src/app/_shared/services/toaster.service';
import { REGEX } from 'src/app/_shared/utils/regex';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    public signupForm: FormGroup;
    public isSigningUp: boolean = false;

    constructor(
        private userManagementService: UserManagementService,
        private authenticationManagementService: AuthenticationManagementService,
        private router: Router,
        private toaster: ToasterService
    ) { }

    ngOnInit(): void {
        this.initializeSignupForm();
    }

    private initializeSignupForm(): void {
        this.signupForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern(REGEX.email)]),
            password: new FormControl('', [Validators.required, Validators.pattern(REGEX.password)]),
            confirmPassword: new FormControl('', [Validators.required])
        }, this.passwordMustMatchValidator);
    }

    private passwordMustMatchValidator(form: AbstractControl) {
        const password = form.get('password').value;
        const confirmPassword = form.get('confirmPassword').value;
        const matched = (password === confirmPassword);
        return matched ? null : { passwordDidNotMatch: true };
    }

    public onFormSubmit(): void {
        console.log('valid', this.signupForm);
        if (this.signupForm.valid) {
            const email: string = this.signupForm.get('email').value;
            const password: string = this.signupForm.get('password').value;
            this.createUserAccount(email.trim(), password.trim());
        } else {
            this.signupForm.markAllAsTouched();
        }
    }

    private createUserAccount(userId: string, userPassword: string): void {
        this.isSigningUp = true;
        this.authenticationManagementService.sendOtp(userId).subscribe(res => {
            console.log("creating");
            this.userManagementService.createUserAccount(userId, userPassword).subscribe(res => {
                this.toaster.success('Sign up successsful')
                this.router.navigate([`${APP_ROUTES.home._}`]);
                this.isSigningUp = false;
            }, err => {
                this.toaster.error(err.errorMessage)
                this.isSigningUp = false;
            })
        }, err => {
            this.toaster.error(err.errorMessage)
            this.isSigningUp = false;
        });
    }
}
