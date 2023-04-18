import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../_shared/utils/routes';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
    {
        path: APP_ROUTES.notSpecified,
        children: [
            { path: APP_ROUTES.notSpecified, redirectTo: APP_ROUTES.auth.signin._, pathMatch: 'full' },
            { path: APP_ROUTES.auth.signup._, component: SignupComponent },
            { path: APP_ROUTES.auth.signin._, component: SigninComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
