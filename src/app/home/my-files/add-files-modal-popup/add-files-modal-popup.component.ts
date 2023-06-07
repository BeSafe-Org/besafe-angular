import { Component, ComponentRef, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-files-modal-popup',
    templateUrl: './add-files-modal-popup.component.html',
    styleUrls: ['./add-files-modal-popup.component.scss']
})
export class AddFilesModalPopupComponent implements OnInit {
    public sendFile = new EventEmitter<{ file: File, isUltraSecure: boolean }>();

    public selfRef: ComponentRef<AddFilesModalPopupComponent>;
    public file: any;
    public isUltraSecureFile: boolean;

    constructor() { }

    ngOnInit(): void {
    }

    public destroySelf(): void {
        this.selfRef.destroy();
    }

    public onClickUploadButton(): void {
        if (this.file) {
            this.sendFile.emit({
                file: this.file,
                isUltraSecure: this.isUltraSecureFile ? true : false
            });
            this.destroySelf();
        }
    }

    public fileSelected(event: any): void {
        this.file = event;
    }

    public checkboxToggle(event: any): void {
        this.isUltraSecureFile = event.target.checked;
    }
}
