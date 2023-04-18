import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../_shared/utils/routes';
import { MyFilesComponent } from './my-files/my-files.component';

export const routes: Routes = [
    {
        path: APP_ROUTES.notSpecified,
        children: [
            { path: APP_ROUTES.notSpecified, redirectTo: APP_ROUTES.home.myFiles._, pathMatch: 'full' },
            { path: APP_ROUTES.home.myFiles._, component: MyFilesComponent },
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
export class HomeRoutingModule { }
