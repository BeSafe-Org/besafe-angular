import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FileViewType, BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';
import { File } from 'src/app/_core/models/entities/File';

// export type FileUI = {
//     id: string,
//     name: string,
//     mimeType: string
// }

export const FILE_NAME_PREFIX = 'BeSafe-';

export const FILE_SYSTEM_OPERATION_CONTAINER_ID = 'file-system-operation-container';

@Directive({
    selector: '[appFileSystemOperations]',
    exportAs: 'operationResult'
})
export class FileSystemOperationsDirective implements OnInit, OnChanges {
    @Input() fileCollection: File[] = [];
    @Input() prefix: string = '';
    @Input() viewType: FileViewType;

    private allFiles: File[] = [];
    private _selectedFilesId: string[] = [];
    private _lastFocusedFileId: string | null = null;
    private shiftStartedFileId: string = '';
    private noOfGridColumns!: number;

    public get selectedFilesId(): string[] { return this._selectedFilesId; }
    public get lastFocusedFileId(): string { return this._lastFocusedFileId; }

    constructor(
        private elementRef: ElementRef,
        private besafeGlobalService: BesafeGlobalService,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngOnInit(): void {
        this.allFiles = [...this.fileCollection];
        this.setNoOfGridColumns();
        this.scrollIntoView(this._lastFocusedFileId);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fileCollection) {
            this.allFiles = [...changes.fileCollection.currentValue];
        }
        if (changes.viewType) {
            this.setNoOfGridColumns();
            this.scrollIntoView(this._lastFocusedFileId);
        }
    }

    @HostListener('window:resize')
    onWindowResize(): void {
        this.setNoOfGridColumns();
    }

    @HostListener('document:keydown.enter', ['$event'])
    enter_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
    }

    @HostListener('document:keydown.control.a')
    control_a_KeyDown(): void {
        if (this.whetherToTerminateOperation(event)) return;
        this.shiftStartedFileId = '';
        this._selectedFilesId = [];
        this.allFiles.forEach(file => this._selectedFilesId.push(file.fileId));
    }

    @HostListener('document:keydown.arrowUp', ['$event'])
    arrowUp_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        event.preventDefault();
        this.shiftStartedFileId = '';
        let lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
        lastIndex = lastIndex === -1 ? 0 : lastIndex;
        if (!(lastIndex < this.noOfGridColumns)) {
            lastIndex = this.isIndexOutOfBound(lastIndex -= this.noOfGridColumns) ? this.allFiles.length - 1 : lastIndex;
        }
        this._lastFocusedFileId = this.allFiles[lastIndex].fileId;
        this._selectedFilesId = [this._lastFocusedFileId];
        this.scrollIntoView(this._lastFocusedFileId);
    }

    @HostListener('document:keydown.arrowDown', ['$event'])
    arrowDown_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        event.preventDefault();
        this.shiftStartedFileId = '';
        let lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
        const remainingItems = this.allFiles.length % this.noOfGridColumns;
        let thresholdIndex = this.allFiles.length - (remainingItems === 0 ? this.noOfGridColumns : remainingItems);
        if (lastIndex === -1) {
            lastIndex = 0
        }
        else if (lastIndex < thresholdIndex) {
            lastIndex = this.isIndexOutOfBound(lastIndex += this.noOfGridColumns) ? this.allFiles.length - 1 : lastIndex;
        }
        this._lastFocusedFileId = this.allFiles[lastIndex].fileId;
        this._selectedFilesId = [this._lastFocusedFileId];
        this.scrollIntoView(this._lastFocusedFileId);
    }

    @HostListener('document:keydown.arrowLeft', ['$event'])
    arrowLeft_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        if (this.viewType === 'grid') {
            event.preventDefault();
            this.shiftStartedFileId = '';
            let lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
            lastIndex = this.isIndexOutOfBound(--lastIndex) ? 0 : lastIndex;
            this._lastFocusedFileId = this.allFiles[lastIndex].fileId;
            this._selectedFilesId = [this._lastFocusedFileId];
            this.scrollIntoView(this._lastFocusedFileId);
        }
    }

    @HostListener('document:keydown.arrowRight', ['$event'])
    arrowRight_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        if (this.viewType === 'grid') {
            event.preventDefault();
            this.shiftStartedFileId = '';
            let lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
            lastIndex = this.isIndexOutOfBound(++lastIndex) ? this.allFiles.length - 1 : lastIndex;
            this._lastFocusedFileId = this.allFiles[lastIndex].fileId;
            this._selectedFilesId = [this._lastFocusedFileId];
            this.scrollIntoView(this._lastFocusedFileId);
        }
    }

    @HostListener('document:keydown.shift.arrowUp', ['$event'])
    shift_arrowUp_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        event.preventDefault();
        let lastIndex = 0;
        let prevIndex = 0;
        lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
        lastIndex = lastIndex === -1 ? 0 : lastIndex;
        if (lastIndex < this.noOfGridColumns) {
            prevIndex = lastIndex;
        }
        else {
            prevIndex = this.isIndexOutOfBound(lastIndex -= this.noOfGridColumns) ? null : lastIndex;
        }
        if (prevIndex !== null) {
            this.shiftClick(this.allFiles[prevIndex].fileId);
        }
    }

    @HostListener('document:keydown.shift.arrowDown', ['$event'])
    shift_arrowDown_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        event.preventDefault();
        let lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
        let nextIndex = null;
        const remainingItems = this.allFiles.length % this.noOfGridColumns;
        let thresholdIndex = this.allFiles.length - (remainingItems === 0 ? this.noOfGridColumns : remainingItems);
        if (lastIndex === -1) {
            nextIndex = 0;
        }
        else if (lastIndex < thresholdIndex) {
            nextIndex = this.isIndexOutOfBound(lastIndex += this.noOfGridColumns) ? this.allFiles.length - 1 : lastIndex;
        }
        if (nextIndex !== null) {
            this.shiftClick(this.allFiles[nextIndex].fileId);
        }
    }

    @HostListener('document:keydown.shift.arrowLeft', ['$event'])
    shift_arrowLeft_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        event.preventDefault();
        let lastIndex = 0;
        let prevIndex = 0;
        if (this._lastFocusedFileId !== null) {
            lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
            prevIndex = this.isIndexOutOfBound(--lastIndex) ? null : lastIndex;
        }
        if (prevIndex !== null) {
            this.shiftClick(this.allFiles[prevIndex].fileId);
        }
    }

    @HostListener('document:keydown.shift.arrowRight', ['$event'])
    shift_arrowRight_KeyDown(event: any): void {
        if (this.whetherToTerminateOperation(event)) return;
        event.preventDefault();
        let lastIndex = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
        let nextIndex = this.isIndexOutOfBound(++lastIndex) ? null : lastIndex;
        if (nextIndex !== null) {
            this.shiftClick(this.allFiles[nextIndex].fileId);
        }
    }

    @HostListener('click', ['$event'])
    click(event: any): void {
        // if (this.whetherToTerminateOperation(event)) return;
        const idWithPrefix: string = event.target.id;
        const id: string = idWithPrefix.substring(this.prefix.length);
        if (idWithPrefix.substring(0, this.prefix.length) !== this.prefix) {
            this.deSelectAll(event);
        }
        else {
            if (event.ctrlKey) {
                this.controlClick(id);
            }
            else if (event.shiftKey) {
                this.shiftClick(id);
            }
            else {
                this.onlyClick(id);
            }
        }
    }

    onlyClick(id: string): void {
        this.shiftStartedFileId = '';
        this._lastFocusedFileId = id;
        this._selectedFilesId = [this._lastFocusedFileId];
        this.scrollIntoView(this._lastFocusedFileId);
    }

    controlClick(id: string): void {
        this.shiftStartedFileId = '';
        this._lastFocusedFileId = id;
        let presentIndex = this._selectedFilesId.findIndex(id => id === this._lastFocusedFileId);
        if (presentIndex === -1) {
            this._selectedFilesId.push(this._lastFocusedFileId);
        }
        else {
            this._selectedFilesId.splice(presentIndex, 1);
        }
        this.scrollIntoView(this._lastFocusedFileId);
    }

    shiftClick(id: string): void {
        this._lastFocusedFileId = this._lastFocusedFileId === null ? this.allFiles[0].fileId : this._lastFocusedFileId;
        this.shiftStartedFileId = this.shiftStartedFileId ? this.shiftStartedFileId : this._lastFocusedFileId;
        this._lastFocusedFileId = id;
        let start: number = this.allFiles.findIndex(file => file.fileId === this.shiftStartedFileId);
        let end: number = this.allFiles.findIndex(file => file.fileId === this._lastFocusedFileId);
        if (!this.isIndexOutOfBound(start) && !this.isIndexOutOfBound(end)) {
            const min = Math.min(start, end);
            const max = Math.max(start, end);
            start = min;
            end = max;
            this._selectedFilesId = [];
            while (start <= end) this._selectedFilesId.push(this.allFiles[start++].fileId);
            this.scrollIntoView(this._lastFocusedFileId);
        }
        else {
            this.onlyClick(this._lastFocusedFileId);
        }
    }

    isIndexOutOfBound(index: number): boolean {
        return (index < 0) || (this.allFiles.length <= index);
    }

    scrollIntoView(id: string): void {
        if (this.allFiles.length === 0) return;
        const isFirst = this.allFiles[0].fileId === id;
        const isLast = this.allFiles[this.allFiles.length - 1].fileId === id;
        this.document.querySelector(`#${this.prefix}${id}`)?.scrollIntoView({ block: isFirst || isLast ? 'center' : 'nearest' });
    }

    setNoOfGridColumns(): void {
        if (this.viewType === 'grid') {
            const gridTemplateColumns: string = new String(
                this.besafeGlobalService.nativeWindow
                    .getComputedStyle(this.elementRef.nativeElement)
                    .getPropertyValue('grid-template-columns')
            ).toString().trim().toLowerCase();
            this.noOfGridColumns = gridTemplateColumns.split('px').length - 1;
        }
        else {
            this.noOfGridColumns = 1;
        }
    }

    isSelected(id: string): boolean {
        return this._selectedFilesId.includes(id);
    }

    isLastFocused(id: string): boolean {
        return this._lastFocusedFileId === id;
    }

    deSelectAll(event: any): void {
        if (!(event.ctrlKey || event.shiftKey)) {
            this._selectedFilesId = [];
            this.shiftStartedFileId = '';
        }
    }

    private whetherToTerminateOperation(event: any): boolean {
        return (event.srcElement.id as string).toLowerCase() !== FILE_SYSTEM_OPERATION_CONTAINER_ID.toLowerCase();
    }
}
