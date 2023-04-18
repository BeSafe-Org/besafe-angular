import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
