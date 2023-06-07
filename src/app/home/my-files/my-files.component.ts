import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AddFilesModalPopupComponent } from './add-files-modal-popup/add-files-modal-popup.component';
import { FILE_OBJ } from './temp';
import { BesafeGlobalService, FileViewType } from 'src/app/_shared/services/besafe-global.service';
import { FILE_SYSTEM_OPERATION_CONTAINER_ID, FileSystemOperationsDirective, FileUI } from '../_shared/directives/file-system-operations/file-system-operations.directive';
import { Subscription } from 'rxjs';
import { FILE_ID_PREFIX } from '../_shared/utils/file-id-prefix';
import { ContextMenuComponent, ContextMenuPointerEventPosition } from '../_shared/components/context-menu/context-menu.component';

@Component({
    selector: 'app-my-files',
    templateUrl: './my-files.component.html',
    styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit, OnDestroy {
    @ViewChild('operationResult') operationResult: FileSystemOperationsDirective;

    public viewType: FileViewType;
    public viewTypeSubscription: Subscription;
    public allFiles: FileUI[] = [];
    public readonly fileIdPrefix: string = FILE_ID_PREFIX.allFiles;
    public readonly fileSystemOperationContainerId: string = FILE_SYSTEM_OPERATION_CONTAINER_ID;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private besafeGlobalService: BesafeGlobalService
    ) { }

    ngOnInit(): void {
        this.initializeViewTypeObserver();
        setTimeout(() => {
            this.getAllFiles();
        }, 0);
    }

    private initializeViewTypeObserver(): void {
        this.viewTypeSubscription = this.besafeGlobalService.fileViewTypeBehaviorSubject.subscribe(value => {
            this.viewType = value;
        });
    }

    private getAllFiles(): void {
        FILE_OBJ.files.forEach(file => {
            this.allFiles.push({
                id: file.id,
                name: file.name,
                mimeType: file.mimeType
            })
        });
        this.allFiles = [...this.allFiles];
    }

    public toggleViewType(): void {
        this.besafeGlobalService.togglefileViewType();
    }

    public openAddFileModalPopup(): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(AddFilesModalPopupComponent);
        const addFilesModalPopupComponentRef = this.viewContainerRef.createComponent(factory);
        addFilesModalPopupComponentRef.instance.selfRef = addFilesModalPopupComponentRef;
    }

    public openContextMenu(event: any): void {
        event.preventDefault();
        // console.log(event);
        this.viewContainerRef.clear();
        const idWithPrefix: string = event.target.id;
        const id: string = idWithPrefix.substring(this.fileIdPrefix.length);
        if (idWithPrefix.substring(0, this.fileIdPrefix.length) === this.fileIdPrefix) {
            if (this.operationResult.selectedFilesId.length <= 1) {
                this.operationResult.onlyClick(id);
                this.createContextMenu([id], { x: event.pageX, y: event.pageY });
            }
            else {
                if (this.operationResult.selectedFilesId.includes(id)) {
                    this.createContextMenu(this.operationResult.selectedFilesId, { x: event.pageX, y: event.pageY });
                }
                else {
                    this.operationResult.onlyClick(id);
                    this.createContextMenu([id], { x: event.pageX, y: event.pageY });
                }
            }
        }
    }

    private createContextMenu(ids: string[], position: ContextMenuPointerEventPosition): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(ContextMenuComponent);
        const contextMenu = this.viewContainerRef.createComponent(factory);
        contextMenu.instance.selfRef = contextMenu;
        contextMenu.instance.selectedFilesId = ids;
        contextMenu.instance.pointerEventPosition = position;

        contextMenu.instance.clickedOnOption.subscribe((event) => {
            // if (event.optionName === 'Rename') {
            //     this.openRenameModalPopup(ids[0]);
            // }
            // else if (event.optionName === 'Delete') {
            //     this.openConfirmDeleteModalPopup(ids);
            // }
        });
    }

    ngOnDestroy(): void {
        this.viewTypeSubscription.unsubscribe();
    }
}
