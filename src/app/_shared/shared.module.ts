import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { ClickedOutsideDirective } from './directives/clicked-outside/clicked-outside.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';

@NgModule({
    declarations: [
        LogoComponent,
        ButtonComponent,
        IconButtonComponent,
        ModalPopupComponent,
        ClickedOutsideDirective,
        LoaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LogoComponent,
        ButtonComponent,
        IconButtonComponent,
        ModalPopupComponent,
        ClickedOutsideDirective,
        LoaderComponent
    ],
    providers: [
    ],
    bootstrap: [
    ]
})
export class SharedModule { }
