import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFilesComponent } from './my-files/my-files.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        MyFilesComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
