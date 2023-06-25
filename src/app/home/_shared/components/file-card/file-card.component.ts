import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FileViewType } from 'src/app/_shared/services/besafe-global.service';
import { FILE_NAME_PREFIX } from '../../directives/file-system-operations/file-system-operations.directive';

type FileIconName = 'default' | 'doc' | 'folder' | 'jpg' | 'music' | 'pdf' | 'png' | 'ppt' | 'txt' | 'video' | 'xls' | 'zip-folder';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileCardComponent implements OnInit {
    @Input() fileName: string;
    @Input() fileMimeType: string;
    @Input() isUltraSafe: boolean;
    @Input() isStarred: boolean;
    @Input() viewType: FileViewType;

    public readonly FILE_NAME_PREFIX = FILE_NAME_PREFIX;
    public fileIconName: FileIconName;

    constructor() { }

    ngOnInit(): void {
        this.setFileImgType();
    }

    private setFileImgType(): void {
        // console.log(this.fileMimeType);
        if (/pdf/.test(this.fileMimeType)) this.fileIconName = 'pdf';
        else if (/video/.test(this.fileMimeType)) this.fileIconName = 'video';
        else if (/rar/.test(this.fileMimeType)) this.fileIconName = 'zip-folder';
        else if (/zip/.test(this.fileMimeType)) this.fileIconName = 'zip-folder';
        else if (/text/.test(this.fileMimeType)) this.fileIconName = 'txt';
        else if (/audio/.test(this.fileMimeType)) this.fileIconName = 'music';
        else if (/png/.test(this.fileMimeType)) this.fileIconName = 'png';
        else if (/jpg/.test(this.fileMimeType)) this.fileIconName = 'jpg';
        else if (/jpeg/.test(this.fileMimeType)) this.fileIconName = 'jpg';
        else if (/presentation/.test(this.fileMimeType)) this.fileIconName = 'ppt';
        else if (/spreadsheetml.sheet/.test(this.fileMimeType)) this.fileIconName = 'xls';
        else if (/doc/.test(this.fileMimeType)) this.fileIconName = 'doc';
        else this.fileIconName = 'default';
    }
}
