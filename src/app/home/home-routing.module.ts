import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from '../_shared/utils/routes';
import { MyFilesComponent } from './my-files/my-files.component';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { StarredFilesComponent } from './starred-files/starred-files.component';
import { UltraSavedFilesComponent } from './ultra-saved-files/ultra-saved-files.component';

export const routes: Routes = [
    {
        path: APP_ROUTES.notSpecified,
        children: [
            { path: APP_ROUTES.notSpecified, redirectTo: APP_ROUTES.home.myFiles._, pathMatch: 'full' },
            { path: APP_ROUTES.home.myFiles._, component: MyFilesComponent },
            { path: APP_ROUTES.home.ultraSavedFiles._, component: UltraSavedFilesComponent },
            { path: APP_ROUTES.home.starredFiles._, component: StarredFilesComponent },
            { path: APP_ROUTES.home.recycleBin._, component: RecycleBinComponent },
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
