import { Component, ComponentRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-files-modal-popup',
    templateUrl: './add-files-modal-popup.component.html',
    styleUrls: ['./add-files-modal-popup.component.scss']
})
export class AddFilesModalPopupComponent implements OnInit {
    public selfRef: ComponentRef<AddFilesModalPopupComponent>

    constructor() { }

    ngOnInit(): void {
    }

    public destroySelf(): void {
        this.selfRef.destroy();
    }

    public onClickUploadButton(): void {
    }
}
