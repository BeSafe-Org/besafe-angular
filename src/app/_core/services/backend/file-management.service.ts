import { Injectable } from '@angular/core';
import { FileBackendClient } from '../../client/backendClient/FileBackendClient';
import { Observable, from } from 'rxjs';
import { BeSafeFile } from '../../models/entities/File';
import { Result } from '../../models/results/Result';


@Injectable({
    providedIn: 'root'
})
export class FileManagementService {

    addFileMetaData(newFile: BeSafeFile): Observable<Result> {
        return from(new FileBackendClient().addFileMetaData(newFile));
    }

    updateFileMetaData(file: BeSafeFile): Observable<Result>  {
        return from(new FileBackendClient().updateFileMetaData(file));
    }

    deleteFileMetaData(fileId: string): Observable<Result>  {
        return from(new FileBackendClient().deleteFileMetaData(fileId));
    }

    searchFileByToken(userId: string, searchToken: string): Observable<BeSafeFile[]>  {
        return from(new FileBackendClient().searchFileByToken(userId, searchToken));
    }

    getAllFiles(userId: string): Observable<BeSafeFile[]>  {
        return from(new FileBackendClient().getAllFiles(userId));
    }

    getStarredFiles(userId: string): Observable<BeSafeFile[]> {
        return from(new FileBackendClient().getStarredFiles(userId));
    }

    getUltraSecureFiles(userId: string): Observable<BeSafeFile[]> {
        return from(new FileBackendClient().getUltraSecureFiles(userId));
    }

    getDeletedFiles(userId: string): Observable<BeSafeFile[]> {
        return from(new FileBackendClient().getDeletedFiles(userId));
    }
}