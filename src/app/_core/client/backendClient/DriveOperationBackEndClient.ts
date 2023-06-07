import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { UploadResult } from '../../models/results/UploadResult';
import { FILE_NAME_PREFIX } from 'src/app/home/my-files/my-files.component';

export class DriveOperationBackEndClient {
    gmail = 'https://gmail.googleapis.com'
    private readonly uploadURL = 'https://www.googleapis.com/upload/drive/v3/files';
    private readonly getFilesUrl = 'https://www.googleapis.com/drive/v3/files';

    constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) { }

    private authHeader(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
        })
    }

    uploadFile(encryptedBlob: Blob, file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            let uploadResult = new UploadResult();
            const metadata = {
                name: FILE_NAME_PREFIX + file.name,
                mimeType: file.type,
            };
            const formData: FormData = new FormData();
            formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            formData.append('file', encryptedBlob);
            const headers = this.authHeader();
            const params = new HttpParams().set('fields', 'id,name,mimeType');
            const options = { headers, params };
            let response = this.httpClient.post(this.uploadURL, formData, options);
            response.subscribe(res => {
                // console.log(res);
                resolve(res)
            })
        })
    }

    downloadFile(fileId: string): Observable<Blob> {
        console.log("Downloading the file with fileId", fileId);
        const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        const headers = this.authHeader();
        return this.httpClient.get(url, { headers, responseType: 'blob' })
    }

    getAllFiles(): Observable<Object> {
        const queryParams = new HttpParams().set("q", "name contains '-besafe'");
        const headers = this.authHeader();
        return this.httpClient.get(this.getFilesUrl, { headers, params: queryParams });
    }

    getFileById(fileId: string): Observable<any> {
        const headers = this.authHeader();
        let getUrl = `https://www.googleapis.com/drive/v2/files/${fileId}`
        return this.httpClient.get(getUrl, { headers });
    }

    deleteFile(fileId: string): Observable<Object> {
        const headers = this.authHeader();
        const deleteUrl = `https://www.googleapis.com/drive/v3/files/${fileId}`;
        return this.httpClient.delete(deleteUrl, { headers });
    }

    isLoggedIn(): boolean {
        return this.oAuthService.hasValidAccessToken()
    }

    signOut() {
        this.oAuthService.logOut()
    }
}
