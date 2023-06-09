import { Component, ComponentRef, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-files-modal-popup',
    templateUrl: './add-files-modal-popup.component.html',
    styleUrls: ['./add-files-modal-popup.component.scss']
})
export class AddFilesModalPopupComponent implements OnInit {
    public sendFile = new EventEmitter<{ file: File, ultraSafe: boolean }>();

    public selfRef: ComponentRef<AddFilesModalPopupComponent>;
    public file: any;
    public ultraSafe: boolean =false;

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
                ultraSafe: this.ultraSafe
            });
            this.destroySelf();
        }
    }

    public fileSelected(event: any): void {
        this.file = event;
    }

    public checkboxToggle(event: any): void {
        this.ultraSafe = event.target.checked;
    }
}
