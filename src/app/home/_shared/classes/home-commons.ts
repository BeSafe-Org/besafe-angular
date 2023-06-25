import { ElementRef } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { BesafeGlobalService, FileViewType } from "src/app/_shared/services/besafe-global.service";
import { BeSafeFile } from "src/app/_core/models/entities/File";
import { FILE_SYSTEM_OPERATION_CONTAINER_ID, FileSystemOperationsDirective } from "../directives/file-system-operations/file-system-operations.directive";
import { FileManagementService } from "src/app/_core/services/backend/file-management.service";
import { GoogleApiService } from "src/app/_core/services/backend/google-api.service";
import { ContextMenuPointerEventPosition } from "../components/context-menu/context-menu.component";
import { ToasterService } from "src/app/_shared/services/toaster.service";

export abstract class HomeCommons {
    // For view type:
    private _viewType: FileViewType;
    private _viewTypeSubscription$: Subscription;
    // For view manipulation:
    private _isLoading: boolean = true;
    private _isError: boolean = false;
    private _isEmpty: boolean = false;
    public readonly fileSystemOperationContainerId: string = FILE_SYSTEM_OPERATION_CONTAINER_ID;
    // For data:
    public fileCollection: BeSafeFile[] = [];
    protected fetchedItems$: Subscription;

    public get isLoading(): boolean { return this._isLoading; }
    public get isError(): boolean { return this._isError; }
    public get isEmpty(): boolean { return this._isEmpty; }
    public get viewType(): FileViewType { return this._viewType; }
    public get viewTypeSubscription$(): Subscription { return this._viewTypeSubscription$; }

    abstract fileSystemOperationContainer: ElementRef;
    abstract operationResult: FileSystemOperationsDirective;
    public abstract readonly fileIdPrefix: string;
    protected abstract initializeViewExtras: () => void;
    public abstract changeFileView(): void;
    protected abstract detectNoOfGridColumns(): void;
    public abstract openContextMenu(event: any): void;
    protected abstract createContextMenu(ids: string[], position: ContextMenuPointerEventPosition): void;

    protected setPageMetaData(titleService: Title, title: string): void {
        titleService.setTitle(title);
    }

    protected setViewType(besafeGlobalService: BesafeGlobalService): void {
        this._viewTypeSubscription$ = besafeGlobalService.fileViewTypeBehaviorSubject.subscribe(value => this._viewType = value);
    }

    protected setLoading(): void {
        this.fileCollection = [];
        this._isLoading = true;
        this._isError = false;
        this._isEmpty = false;
    }

    protected setError(): void {
        this.fileCollection = [];
        this._isLoading = false;
        this._isError = true;
        this._isEmpty = false;
    }

    protected setEmpty(): void {
        this.fileCollection = [];
        this._isLoading = false;
        this._isError = false;
        this._isEmpty = true;
    }

    protected setContent(fileCollection: BeSafeFile[]): void {
        this.fileCollection = fileCollection;
        this._isLoading = false;
        this._isError = false;
        this._isEmpty = false;
    }

    protected initializeView(initializeViewExtras: Function): void {
        // reset view:
        this.setLoading();

        // unsubscribe fetchedItems$ Subscription:
        this.fetchedItems$?.unsubscribe();

        // reset extras:
        initializeViewExtras();
    }

    // File related API calls:
    protected restoreFileFromRecycleBin(toasterService: ToasterService, fileManagementService: FileManagementService, file: BeSafeFile, refresh: Function): void {
        file.deleted = false;
        fileManagementService.updateFileMetaData(file).subscribe(res => {
            // console.log(res);
            refresh();
            toasterService.success('File restored successfully');
        }, error => {
            // console.log(error);
            toasterService.error('Error restoring file');
        });
    }

    protected moveFileToRecycleBin(toasterService: ToasterService, fileManagementService: FileManagementService, file: BeSafeFile, refresh: Function): void {
        file.deleted = true;
        fileManagementService.updateFileMetaData(file).subscribe(res => {
            // console.log(res);
            refresh();
            toasterService.success('File moved to recycle bin');
        }, error => {
            // console.log(error);
            toasterService.error('Error while moving file to recycle bin');
        });
    }

    protected downloadFile(toasterService: ToasterService, googleApiService: GoogleApiService, id: string, name: string): void {
        googleApiService.downloadFile(id, name).subscribe(res => {
            // console.log('File Downloaded:', res);
            toasterService.success('File donwloaded successfully');
        }, error => {
            // console.error('Error downloading file:', error);
            toasterService.error('Error while downloading file');
        }
        );
    }

    protected deleteFilePermanently(toasterService: ToasterService, googleApiService: GoogleApiService, fileManagementService: FileManagementService, id: string, refresh: Function): void {
        googleApiService.deleteFile(id).subscribe(
            (response) => {
                // console.log('File deleted permanently', response);
                fileManagementService.deleteFileMetaData(id).subscribe(res => {
                    refresh();
                    toasterService.success('File permanently deleted');
                }, err => {
                });
            },
            (error) => {
                // console.log('Error deleting file permanently', error);
                toasterService.error('Error while deleting file permanently');
            }
        );
    }

    protected toggleFileAsFavourite(toasterService: ToasterService, fileManagementService: FileManagementService, file: BeSafeFile, refresh: Function): void {
        const changeTo = !file.starred;
        file.starred = changeTo;
        fileManagementService.updateFileMetaData(file).subscribe(res => {
            // console.log(res);
            toasterService.success(changeTo ? 'File marked as favourite' : 'File removed from favourites');
        }, error => {
            // console.log(error);
            toasterService.error(changeTo ? 'Error marking file as favourite' : 'Error removing file from favourites');
        });
    }
}
