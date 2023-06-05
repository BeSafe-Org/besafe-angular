import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFilesComponent } from './my-files/my-files.component';
import { HomeRoutingModule } from './home-routing.module';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';
import { StarredFilesComponent } from './starred-files/starred-files.component';
import { UltraSavedFilesComponent } from './ultra-saved-files/ultra-saved-files.component';
import { FileGridCardComponent } from './my-files/file-grid-card/file-grid-card.component';
import { FileListCardComponent } from './my-files/file-list-card/file-list-card.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
    declarations: [
        MyFilesComponent,
        RecycleBinComponent,
        StarredFilesComponent,
        UltraSavedFilesComponent,
        FileGridCardComponent,
        FileListCardComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule { }
