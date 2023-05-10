import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
    declarations: [
        LogoComponent,
        ButtonComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LogoComponent,
        ButtonComponent
    ],
    providers: [
    ],
    bootstrap: [
    ]
})
export class SharedModule { }
