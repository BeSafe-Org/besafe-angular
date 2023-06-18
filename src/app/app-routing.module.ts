import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './_shared/utils/routes';

const routes: Routes = [
    { path: APP_ROUTES.notSpecified, redirectTo: `/${APP_ROUTES.home._}/${APP_ROUTES.home.myFiles._}`, pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
