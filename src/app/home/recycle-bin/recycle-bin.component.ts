import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GoogleApiService, UserInfo } from 'src/app/_core/services/backend/google-api.service';
import { FileSystemOperationsDirective } from '../_shared/directives/file-system-operations/file-system-operations.directive';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';
import { FILE_ID_PREFIX } from '../_shared/utils/file-id-prefix';
import { FileManagementService } from 'src/app/_core/services/backend/file-management.service';
import { BeSafeFile } from 'src/app/_core/models/entities/File';
import { ContextMenuComponent, ContextMenuPointerEventPosition } from '../_shared/components/context-menu/context-menu.component';
import { ToasterService } from 'src/app/_shared/services/toaster.service';
import { LocalStorage } from 'src/app/_core/client/utils/LocalStorage';
import { HomeCommons } from '../_shared/classes/home-commons';
import { Title } from '@angular/platform-browser';
import { META_TAGS } from 'src/app/_shared/utils/meta-tags';

@Component({
    selector: 'app-recycle-bin',
    templateUrl: './recycle-bin.component.html',
    styleUrls: ['./recycle-bin.component.scss']
})

export class RecycleBinComponent extends HomeCommons implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('fileSystemOperationContainer') fileSystemOperationContainer: ElementRef;
    @ViewChild('operationResult') operationResult: FileSystemOperationsDirective;

    userInfo?: UserInfo;
    public readonly fileIdPrefix: string = FILE_ID_PREFIX.allFiles;
    private userId: string = new LocalStorage().getItem("userId");
    private setTimeoutRef: NodeJS.Timeout;

    constructor(
        private titleService: Title,
        private changeDetectorRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        private fileManagementService: FileManagementService,
        private besafeGlobalService: BesafeGlobalService,
        private googleApiService: GoogleApiService,
        private toasterService: ToasterService
    ) {
        super();
        googleApiService.userProfileSubject.subscribe(info => {
            this.userInfo = info
        })
    }

    ngOnInit(): void {
        this.setPageMetaData(this.titleService, META_TAGS.recycleBin);
        this.setViewType(this.besafeGlobalService);
        this.initializeView(this.initializeViewExtras);
        this.setTimeoutRef = setTimeout(() => {
            this.getRecycleBinFiles();
        }, 1000);
    }

    ngAfterViewInit(): void {
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

    private getRecycleBinFiles = (): void => {
        this.initializeView(this.initializeViewExtras);
        this.fetchedItems$ = this.fileManagementService.getDeletedFiles(this.userId).subscribe(
            (response) => {
                // console.log('Recycle bin files retrieved successfully:', response);
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
            { type: 'restore', name: 'Restore', isForSingle: true, svgImgName: 'restore-icon' },
            { type: 'delete', name: 'Delete permanently', isForSingle: true, svgImgName: 'delete-icon' }
        ];

        contextMenu.instance.clickedOnOption.subscribe((clickedOption) => {
            const file = contextMenu.instance.selectedFiles[0];
            switch (clickedOption) {
                case 'restore':
                    this.restoreFileFromRecycleBin(this.toasterService, this.fileManagementService, file, this.getRecycleBinFiles);
                    break;
                case 'delete':
                    this.deleteFilePermanently(this.toasterService, this.googleApiService, this.fileManagementService, file.fileId, this.getRecycleBinFiles);
            }
        });
    }

    ngOnDestroy(): void {
        this.fetchedItems$?.unsubscribe();
        this.viewTypeSubscription$?.unsubscribe();
        clearTimeout(this.setTimeoutRef);
    }
}
