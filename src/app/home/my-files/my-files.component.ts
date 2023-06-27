import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AddFilesModalPopupComponent } from './add-files-modal-popup/add-files-modal-popup.component';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';
import { FileSystemOperationsDirective } from '../_shared/directives/file-system-operations/file-system-operations.directive';
import { FILE_ID_PREFIX } from '../_shared/utils/file-id-prefix';
import { ContextMenuComponent, ContextMenuPointerEventPosition } from '../_shared/components/context-menu/context-menu.component';
import { GoogleApiService, UserInfo } from 'src/app/_core/services/backend/google-api.service';
import { FileManagementService } from 'src/app/_core/services/backend/file-management.service';
import { BeSafeFile } from 'src/app/_core/models/entities/File';
import { SmartContractService } from 'src/app/_core/services/backend/smart-contract.service';
import { ToasterService } from 'src/app/_shared/services/toaster.service';
import { LocalStorage } from 'src/app/_core/client/utils/LocalStorage';
import { HomeCommons } from '../_shared/classes/home-commons';
import { Title } from '@angular/platform-browser';
import { META_TAGS } from 'src/app/_shared/utils/meta-tags';
import { ThemeService } from 'src/app/_shared/services/theme.service';
import { SearchService } from 'src/app/layout/_shared/services/search.service';
import { FileCategory } from 'src/app/_core/models/entities/FileCategory';

export const FILE_NAME_PREFIX = '';

@Component({
    selector: 'app-my-files',
    templateUrl: './my-files.component.html',
    styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent extends HomeCommons implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('fileSystemOperationContainer') fileSystemOperationContainer: ElementRef;
    @ViewChild('operationResult') operationResult: FileSystemOperationsDirective;

    userInfo?: UserInfo;
    public readonly fileIdPrefix: string = FILE_ID_PREFIX.allFiles;
    public readonly FILE_NAME_PREFIX = FILE_NAME_PREFIX; // remove later
    private userId: string = new LocalStorage().getItem("userId");
    private setTimeoutRef: NodeJS.Timeout;

    constructor(
        private titleService: Title,
        private changeDetectorRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private besafeGlobalService: BesafeGlobalService,
        private fileManagementService: FileManagementService,
        private smartContractService: SmartContractService,
        private googleApiService: GoogleApiService,
        private toasterService: ToasterService,
        private searchService: SearchService,
        public themeService: ThemeService
    ) {
        super();
        googleApiService.userProfileSubject.subscribe(info => {
            this.userInfo = info
        });
    }

    ngOnInit(): void {
        this.setPageMetaData(this.titleService, META_TAGS.myFiles);
        this.setViewType(this.besafeGlobalService);
        this.searchService.searchInitiator.subscribe((value) => {
            this.searchTerm = value.searchTerm;
            if (this.searchTerm) {
                this.getFilesFromSearch(this.fileManagementService, this.userId, FileCategory.ALL, this.searchTerm);
            } else {
                // this.setTimeoutRef = setTimeout(() => {
                this.getAllFiles();
                // }, 3000);
            }
        });
    }

    ngAfterViewInit(): void {
        this.searchService.searchInObserver.next('all-files');
        this.fileSystemOperationContainer.nativeElement.focus();
    }

    protected initializeViewExtras = (): void => {
    }

    public changeFileView(): void {
        this.besafeGlobalService.changeFileView();
    }

    protected detectNoOfGridColumns(): void {
        this.changeDetectorRef.detectChanges();
        this.operationResult.setNoOfGridColumns();
    }

    private getAllFiles = (): void => {
        this.initializeView(this.initializeViewExtras);
        this.fetchedItems$?.unsubscribe();
        this.fetchedItems$ = this.fileManagementService.getAllFiles(this.userId).subscribe(
            (response) => {
                // console.log('All files retrieved successfully:', response);
                if (response.length === 0) {
                    this.setEmpty();
                }
                else {
                    this.setContent(response);
                    this.detectNoOfGridColumns();
                }
            },
            (error) => {
                // console.log('Error retrieving all files:', error);
                this.setError();
            }
        );
    }

    public openAddFileModalPopup(): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(AddFilesModalPopupComponent);
        const addFilesModalPopupComponentRef = this.viewContainerRef.createComponent(factory);
        addFilesModalPopupComponentRef.instance.selfRef = addFilesModalPopupComponentRef;
        addFilesModalPopupComponentRef.instance.sendFile.subscribe(({ file, ultraSafe }) => {
            this.uploadFile(file, ultraSafe);
        });
    }

    private uploadFile(event: any, ultraSafe: boolean): void {
        // console.log('isUltraSecure: ', ultraSafe);
        // this.googleApiService.connectCloud();
        this.googleApiService.uploadFile(event, ultraSafe).subscribe(
            res => {
                let uploadFile: BeSafeFile = new BeSafeFile();
                uploadFile.userId = this.userId;
                uploadFile.fileId = res.id;
                uploadFile.fileName = res.name;
                uploadFile.mimeType = res.mimeType;
                uploadFile.deleted = false;
                uploadFile.starred = false;
                uploadFile.ultraSafe = ultraSafe;
                this.fileManagementService.addFileMetaData(uploadFile).subscribe(res => {
                    // console.log(res);
                    this.getAllFiles();
                    this.toasterService.success('File uploaded successfully');
                }, error => {
                    // console.log(error);
                })
            },
            error => {
                // console.error('Error uploading file:', error);
                this.toasterService.success('Error while uploading file');
            }
        );
    }

    public openContextMenu(event: any): void {
        event.preventDefault();
        this.viewContainerRef.clear();
        const idWithPrefix: string = event.target.id;
        const id: string = idWithPrefix.substring(this.fileIdPrefix.length);
        if (idWithPrefix.substring(0, this.fileIdPrefix.length) === this.fileIdPrefix) {
            if (this.operationResult.selectedFilesId.length <= 1) {
                this.operationResult.onlyClick(id);
                this.createContextMenu([id], { x: event.pageX, y: event.pageY }
                );
            }
            else {
                // if (this.operationResult.selectedFilesId.includes(id)) {
                //     this.createContextMenu(this.operationResult.selectedFilesId, { x: event.pageX, y: event.pageY });
                // }
                // else {
                //     this.operationResult.onlyClick(id);
                //     this.createContextMenu([id], { x: event.pageX, y: event.pageY });
                // }
            }
        }
    }

    protected createContextMenu(ids: string[], position: ContextMenuPointerEventPosition): void {
        this.viewContainerRef.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(ContextMenuComponent);
        const contextMenu = this.viewContainerRef.createComponent(factory);
        contextMenu.instance.selfRef = contextMenu;
        const files: BeSafeFile[] = [];
        ids.forEach(id => {
            const file = this.fileCollection.find(file => file.fileId === id);
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
                    this.toggleFileAsFavourite(this.toasterService, this.fileManagementService, file, this.getAllFiles);
                    break;
                case 'download':
                    this.downloadFile(this.toasterService, this.googleApiService, file.fileId, file.fileName);
                    break;
                case 'delete':
                    this.moveFileToRecycleBin(this.toasterService, this.fileManagementService, file, this.getAllFiles);
            }
        });
    }

    ngOnDestroy(): void {
        this.fetchedItems$?.unsubscribe();
        this.viewTypeSubscription$?.unsubscribe();
        clearTimeout(this.setTimeoutRef);
    }
}
