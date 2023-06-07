import { Injectable } from '@angular/core';
import { FileBackendClient } from '../../client/backendClient/FileBackendClient';
import { from } from 'rxjs';
import { File } from '../../models/entities/File';


@Injectable({
    providedIn: 'root'
})
export class FileManagementService {

    addFileMetaData(newFile: File) {
        return from(new FileBackendClient().addFileMetaData(newFile));
    }

    updateFileMetaData(file: File) {
        return from(new FileBackendClient().updateFileMetaData(file));
    }

    deleteFileMetaData(fileId: string) {
        return from(new FileBackendClient().deleteFileMetaData(fileId));
    }

    getAllFiles(userId: string) {
        return from(new FileBackendClient().getAllFiles(userId));
    }

    getStarredFiles(userId: string) {
        return from(new FileBackendClient().getStarredFiles(userId));
    }

    getUltraSecureFiles(userId: string) {
        return from(new FileBackendClient().getUltraSecureFiles(userId));
    }

    getDeletedFiles(userId: string) {
        return from(new FileBackendClient().getDeletedFiles(userId));
    }
}