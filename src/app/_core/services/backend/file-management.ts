import { Injectable } from '@angular/core';
import { FileBackendClient } from '../../client/backendClient/FileBackendClient';
import { from } from 'rxjs';
import { File } from '../../models/entities/File';


@Injectable({
    providedIn: 'root'
})
export class FileManagementService {

    addFileMetaData(newFile: File){
        return from(new FileBackendClient().addFileMetaData(newFile));
    }
    
    updateFileMetaData(file: File){
        return from(new FileBackendClient().updateFileMetaData(file));
    }
    
    deleteFileMetaData(fileId: string){
        return from(new FileBackendClient().deleteFileMetaData(fileId));
    }
   
}