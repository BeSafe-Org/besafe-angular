import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../_shared/utils/routes';
import { AuthGuard } from '../_core/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout.component';
import { HomeGuard } from '../_core/guards/home.guard';

export const routes: Routes = [
    {
        path: APP_ROUTES.notSpecified, component: LayoutComponent, canActivate: [HomeGuard],
        children: [
            { path: APP_ROUTES.notSpecified, redirectTo: APP_ROUTES.home._, pathMatch: 'full' },
            { path: APP_ROUTES.home._, loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
        ]
    },
    {
        path: APP_ROUTES.auth._, canActivate: [AuthGuard],
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**', component: PageNotFoundComponent
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
export class LayoutRoutingModule { }
