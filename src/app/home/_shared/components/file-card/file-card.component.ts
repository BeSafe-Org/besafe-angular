import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FileViewType } from 'src/app/_shared/services/besafe-global.service';
import { FILE_NAME_PREFIX } from '../../directives/file-system-operations/file-system-operations.directive';

@Component({
    selector: 'app-file-card',
    templateUrl: './file-card.component.html',
    styleUrls: ['./file-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileCardComponent implements OnInit {
    @Input() fileName: string;
    @Input() viewType: FileViewType;

    public readonly FILE_NAME_PREFIX = FILE_NAME_PREFIX;

    constructor() { }

    ngOnInit(): void {
    }
}
