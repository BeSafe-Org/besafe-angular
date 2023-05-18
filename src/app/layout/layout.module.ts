import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
    declarations: [
        LayoutComponent,
        NavbarComponent,
        SidebarComponent,
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule
    ]
})
export class LayoutModule { }
