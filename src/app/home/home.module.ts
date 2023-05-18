import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFilesComponent } from './my-files/my-files.component';
import { HomeRoutingModule } from './home-routing.module';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { StarredFilesComponent } from './starred-files/starred-files.component';
import { UltraSavedFilesComponent } from './ultra-saved-files/ultra-saved-files.component';

@NgModule({
    declarations: [
        MyFilesComponent,
        RecycleBinComponent,
        StarredFilesComponent,
        UltraSavedFilesComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
