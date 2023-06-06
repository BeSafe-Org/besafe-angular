import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleApiService, UserInfo } from 'src/app/_core/services/backend/google-api.service';
import { Conversion } from 'src/app/_core/utils/Conversion';
import { BesafeCrypto } from 'src/app/_core/utils/BesafeCrypto';

@Component({
    selector: 'app-recycle-bin',
    templateUrl: './recycle-bin.component.html',
    styleUrls: ['./recycle-bin.component.scss']
})

export class RecycleBinComponent {
    title = 'Recycle-bin';
    userInfo?: UserInfo
    files: any[] = [];

    constructor(private googleApi: GoogleApiService) {
        googleApi.userProfileSubject.subscribe(info => {
            this.userInfo = info
        })
    }

    isLoggedIn(): boolean {
        return this.googleApi.isLoggedIn()
    }

    logout() {
        this.googleApi.signOut()
    }

    onFileSelected(event: any): void {
        this.googleApi.uploadFile(event).subscribe(
            res => {
                console.log('File Uploaded:', res);
            },
            error => {
                console.error('Error uploading file:', error);
            }
        );
    }

    downloadFile(fileId = "1I81hSgJg-lJhfukhWSZS_izZjUOdvIHo", fileName = "something.pdf") {
        this.googleApi.downloadFile(fileId, fileName).subscribe(
            res => {
                console.log('File Downloaded:', res);
            },
            error => {
                console.error('Error downloading file:', error);
            }
        );
    }

    getFileById(fileId = "1zlP_fWJhXZQKjsMMihxpmZ3MiYPDW6Ah") {
        this.googleApi.getFileById(fileId).subscribe(
            (response) => {
                console.log('Files retrieved successfully:', response);
            },
            (error) => {
                console.error('Error retrieving files:', error);
            }
        );
    }

    getAllFiles() {
        this.googleApi.getAllFiles().subscribe(
            (response) => {
                console.log('All files retrieved successfully:', response);
            },
            (error) => {
                console.log('Error retrieving all files:', error);
            }
        );
    }

    deleteFile() {
        this.googleApi.deleteFile("1smMbYIr4WARD27pK-ewvOW7ylRUTEBor").subscribe(
            (response) => {
                console.log('File deleted successfully', response);
            },
            (error) => {
                console.log('Error deleted file', error);
            }
        );
    }
}
