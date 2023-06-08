import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AddFilesModalPopupComponent } from './add-files-modal-popup/add-files-modal-popup.component';
import { BesafeGlobalService, FileViewType } from 'src/app/_shared/services/besafe-global.service';
import { FILE_SYSTEM_OPERATION_CONTAINER_ID, FileSystemOperationsDirective } from '../_shared/directives/file-system-operations/file-system-operations.directive';
import { Subscription } from 'rxjs';
import { FILE_ID_PREFIX } from '../_shared/utils/file-id-prefix';
import { ContextMenuComponent, ContextMenuPointerEventPosition } from '../_shared/components/context-menu/context-menu.component';
import { GoogleApiService, UserInfo } from 'src/app/_core/services/backend/google-api.service';
import { FileManagementService } from 'src/app/_core/services/backend/file-management.service';
import { File } from 'src/app/_core/models/entities/File';
import { SmartContractService } from 'src/app/_core/services/backend/smart-contract.service';
import { ToasterService } from 'src/app/_shared/services/toaster.service';
import { LocalStorage } from 'src/app/_core/client/utils/LocalStorage';

export const FILE_NAME_PREFIX = 'BeSafe-';

@Component({
    selector: 'app-my-files',
    templateUrl: './my-files.component.html',
    styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit, OnDestroy {
    @ViewChild('operationResult') operationResult: FileSystemOperationsDirective;

    public viewType: FileViewType;
    userInfo?: UserInfo;
    public viewTypeSubscription: Subscription;
    public allFiles: File[] = [];
    private allFiles$: Subscription;
    public readonly fileIdPrefix: string = FILE_ID_PREFIX.allFiles;
    public readonly fileSystemOperationContainerId: string = FILE_SYSTEM_OPERATION_CONTAINER_ID;

    public isLoading: boolean = true;
    public isEmpty: boolean = true;

    userId: string = new LocalStorage().getItem("userId");

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private besafeGlobalService: BesafeGlobalService,
        private fileManagementService: FileManagementService,
        private smartContractService: SmartContractService,
        private googleApi: GoogleApiService,
        private toaster: ToasterService
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
        this.isLoading = true;
        this.isEmpty = false;
        this.allFiles = [];
        this.getAllFiles();
    }

    private refresh(): void {
        this.getAllFiles();
    }

    private initializeViewTypeObserver(): void {
        this.viewTypeSubscription = this.besafeGlobalService.fileViewTypeBehaviorSubject.subscribe(value => {
            this.viewType = value;
        });
    }

    private getAllFiles(): void {
        const userId = this.userId;
        console.log(userId);
        this.allFiles$ = this.fileManagementService.getAllFiles(userId).subscribe(
            (response) => {
                // console.log('All files retrieved successfully:', response);
                if (response.length === 0) {
                    this.isLoading = false;
                    this.isEmpty = true;
                }
                else {
                    const temp = [...response];
                    const compare = (s1: string, s2: string, i: number): boolean => s1[i] === s2[i] ? compare(s1, s2, i + 1) : s1[i] > s2[i];
                    temp.sort((a, b) => compare(a.fileName, b.fileName, 0) ? -1 : 1);
                    this.allFiles = [...temp];
                    this.isLoading = false;
                    this.isEmpty = false;
                    this.changeDetectorRef.detectChanges();
                    this.operationResult.setNoOfGridColumns();
                }
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
        addFilesModalPopupComponentRef.instance.sendFile.subscribe(({ file, isUltraSecure }) => {
            this.uploadFile(file, isUltraSecure);
        });
    }

    private uploadFile(event: any, isUltraSecure: boolean): void {
        console.log('isUltraSecure', isUltraSecure);
        this.googleApi.uploadFile(event, isUltraSecure).subscribe(
            res => {
                let uploadFile: File = new File();
                uploadFile.userId = this.userId;
                uploadFile.fileId = res.id;
                uploadFile.fileName = res.name;
                uploadFile.mimeType = res.mimeType;
                uploadFile.deleted = false;
                uploadFile.starred = false;
                uploadFile.ultraSecure = false;
                this.fileManagementService.addFileMetaData(uploadFile).subscribe(res => {
                    // console.log(res);
                    this.refresh();
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
        this.fileManagementService.deleteFileMetaData(id).subscribe(res => {
            // console.log(res);
            this.refresh();
        }, error => {
            console.log(error);
        })
    }

    private toggleFileAsFavourite(file: File): void {
        file.starred = !file.starred;
        this.fileManagementService.updateFileMetaData(file).subscribe(res => {
            // console.log(res);
        }, error => {
            // console.log(error);
        });
    }

    public openContextMenu(event: any): void {
        event.preventDefault();
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
        this.viewContainerRef.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(ContextMenuComponent);
        const contextMenu = this.viewContainerRef.createComponent(factory);
        contextMenu.instance.selfRef = contextMenu;
        const files: File[] = [];
        ids.forEach(id => {
            const file = this.allFiles.find(file => file.fileId === id);
            if (file) files.push(file);
        });
        contextMenu.instance.selectedFiles = files;
        contextMenu.instance.pointerEventPosition = position;
        contextMenu.instance.options = [
            { type: 'star', name: files[0].starred ? 'Remove from favourites' : 'Mark as favourite', isForSingle: true, svgImgName: 'star-icon' },
            { type: 'download', name: 'Download', isForSingle: true, svgImgName: 'download-icon' },
            { type: 'delete', name: 'Delete', isForSingle: true, svgImgName: 'delete-icon' }
        ];

        contextMenu.instance.clickedOnOption.subscribe((clickedOption) => {
            const file = contextMenu.instance.selectedFiles[0];
            switch (clickedOption) {
                case 'star':
                    this.toggleFileAsFavourite(file);
                    break;
                case 'download':
                    this.downloadFile(file.fileId, file.fileName);
                    break;
                case 'delete':
                    this.deleteFileById(file.fileId);
            }
        });
    }

    ngOnDestroy(): void {
        this.allFiles$.unsubscribe();
        this.viewTypeSubscription.unsubscribe();
    }
}
