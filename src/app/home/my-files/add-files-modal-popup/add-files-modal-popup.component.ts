import { Component, ComponentRef, EventEmitter, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/_shared/services/toaster.service';

@Component({
    selector: 'app-add-files-modal-popup',
    templateUrl: './add-files-modal-popup.component.html',
    styleUrls: ['./add-files-modal-popup.component.scss']
})
export class AddFilesModalPopupComponent implements OnInit {
    public sendFile = new EventEmitter<{ file: File, ultraSafe: boolean }>();

    public selfRef: ComponentRef<AddFilesModalPopupComponent>;
    public file: any;
    public ultraSafe: boolean = false;

    constructor(
        private toasterService: ToasterService
    ) { }

    ngOnInit(): void {
        if (localStorage.getItem('isCloudConnected') !== 'true') {
            this.toasterService.warn('Please conect your Google cloud account');
        }
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
