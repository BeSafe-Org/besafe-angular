import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';

@NgModule({
    declarations: [
        LogoComponent,
        ButtonComponent,
        ModalPopupComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LogoComponent,
        ButtonComponent,
        ModalPopupComponent
    ],
    providers: [
    ],
    bootstrap: [
    ]
})
export class SharedModule { }
