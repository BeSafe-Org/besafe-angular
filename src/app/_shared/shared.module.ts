import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';

@NgModule({
    declarations: [
        LogoComponent,
        ButtonComponent,
        ModalPopupComponent,
        ClickedOutsideDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LogoComponent,
        ButtonComponent,
        ModalPopupComponent,
        ClickedOutsideDirective
    ],
    providers: [
    ],
    bootstrap: [
    ]
})
export class SharedModule { }
