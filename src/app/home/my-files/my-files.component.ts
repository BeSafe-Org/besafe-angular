import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AddFilesModalPopupComponent } from './add-files-modal-popup/add-files-modal-popup.component';
import { BesafeGlobalService, FileViewType } from 'src/app/_shared/services/besafe-global.service';
import { FILE_SYSTEM_OPERATION_CONTAINER_ID, FileSystemOperationsDirective, FileUI } from '../_shared/directives/file-system-operations/file-system-operations.directive';
import { Subscription } from 'rxjs';
import { FILE_ID_PREFIX } from '../_shared/utils/file-id-prefix';
import { ContextMenuComponent, ContextMenuPointerEventPosition } from '../_shared/components/context-menu/context-menu.component';
import { GoogleApiService, UserInfo } from 'src/app/_core/services/backend/google-api.service';
import { FileManagementService } from 'src/app/_core/services/backend/file-management.service';
import { File } from 'src/app/_core/models/entities/File';

export const FILE_NAME_PREFIX = 'BeSafe-';

@Component({
    selector: 'app-my-files',
    templateUrl: './my-files.component.html',
    styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit, OnDestroy {
    @ViewChild('operationResult') operationResult: FileSystemOperationsDirective;

    public viewType: FileViewType; userInfo?: UserInfo
    public viewTypeSubscription: Subscription;
    public allFiles: FileUI[] = [];
    public readonly fileIdPrefix: string = FILE_ID_PREFIX.allFiles;
    public readonly fileSystemOperationContainerId: string = FILE_SYSTEM_OPERATION_CONTAINER_ID;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private besafeGlobalService: BesafeGlobalService,
        private fileManagementService: FileManagementService,
        private googleApi: GoogleApiService
    ) {
        googleApi.userProfileSubject.subscribe(info => {
            this.userInfo = info
        })
    }

    ngOnInit(): void {
        this.initializeViewTypeObserver();
        this.initial();
    }

    private initial(): void {
        this.allFiles = [];
        this.getAllFiles();
    }

    private initializeViewTypeObserver(): void {
        this.viewTypeSubscription = this.besafeGlobalService.fileViewTypeBehaviorSubject.subscribe(value => {
            this.viewType = value;
        });
    }

    private getAllFiles(): void {
        // this.googleApi.getAllFiles().subscribe(
        //     (response: any) => {
        //         // console.log('All files retrieved successfully:', response);
        //         (response.files as any[]).forEach(file => {
        //             this.allFiles.push({
        //                 id: file.id,
        //                 name: file.name,
        //                 mimeType: file.mimeType
        //             })
        //         });
        //         this.allFiles = [...this.allFiles];
        //         this.operationResult.setNoOfGridColumns();
        //     },
        //     (error) => {
        //         // console.log('Error retrieving all files:', error);
        //     }
        // );

        let userId = "wvnbrghllcrzy@internetkeno.com"; 
        this.fileManagementService.getAllFiles(userId).subscribe(
            (response: any) => {
                // console.log('All files retrieved successfully:', response);
                (response.files as any[]).forEach(file => {
                    this.allFiles.push({
                        id: file.id,
                        name: file.name,
                        mimeType: file.mimeType
                    })
                });
                this.allFiles = [...this.allFiles];
                this.operationResult.setNoOfGridColumns();
            },
            (error) => {
                // console.log('Error retrieving all files:', error);
            }
        );
    }

    public toggleViewType(): void {
        this.besafeGlobalService.togglefileViewType();
    }

    public openAddFileModalPopup(): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(AddFilesModalPopupComponent);
        const addFilesModalPopupComponentRef = this.viewContainerRef.createComponent(factory);
        addFilesModalPopupComponentRef.instance.selfRef = addFilesModalPopupComponentRef;

        addFilesModalPopupComponentRef.instance.sendFile.subscribe((file) => {
            this.uploadFile(file);
        });
    }

    private uploadFile(event: any): void {
        this.googleApi.uploadFile(event).subscribe(
            res => {
                let uploadFile: File = new File();
                uploadFile.userId = "wvnbrghllcrzy@internetkeno.com";
                uploadFile.fileId = res.id;
                uploadFile.fileName = res.fileName;
                uploadFile.mimeType = res.mimeType;
                uploadFile.deleted = false;
                uploadFile.starred = false;
                // uploadFile.ultraSecure = false;
                this.fileManagementService.addFileMetaData(uploadFile).subscribe(res => {
                    console.log(res);
                    this.initial();
                }, error => {
                    console.log(error);
                })
            },
            error => {
                // console.error('Error uploading file:', error);
            }
        );
    }

    private downloadFile(id: string, name: string) {
        this.googleApi.downloadFile(id, name).subscribe(
            res => {
                // console.log('File Downloaded:', res);
            },
            error => {
                // console.error('Error downloading file:', error);
            }
        );
    }

    private deleteFileById(id: string) {
        this.googleApi.deleteFile(id).subscribe(
            (response) => {
                // console.log('File deleted successfully', response);
                this.fileManagementService.deleteFileMetaData(id).subscribe(res => {
                    console.log(res);
                    this.initial();
                }, error => {
                    console.log(error);
                })
            },
            (error) => {
                // console.log('Error deleted file', error);
            }
        );
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
            //     // this.openRenameModalPopup(ids[0]);
            // }
            // else if (event.optionName === 'Delete') {
            //     // this.openConfirmDeleteModalPopup(ids);
            // }
            const fileId = contextMenu.instance.selectedFilesId[0];
            const fileName = this.allFiles.find((f) => f.id).name.slice(FILE_NAME_PREFIX.length);
            const fileMimeType = this.allFiles.find((f) => f.id).mimeType;
            console.log(fileName, fileMimeType);
            switch (event) {
                case 'star':
                    // this.fileManagementService.updateFileMetaData()
                    break;
                case 'download':
                    this.downloadFile(fileId, fileName);
                    break;
                case 'delete':
                    this.deleteFileById(fileId);
            }
        });
    }

    ngOnDestroy(): void {
        this.viewTypeSubscription.unsubscribe();
    }
}
