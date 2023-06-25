import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { DriveOperationClient } from '../../client/managementClient/DriveOperationClient';
import { DriveOperationBackEndClient } from '../../client/backendClient/DriveOperationBackEndClient';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

const authCodeFlowConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: `http://localhost:4200/${APP_ROUTES.googleRedirect}`,
    clientId: "232333650014-qq92u4mj4jh97r1asgv32e90fqcdbsg1.apps.googleusercontent.com",
    scope: 'openid profile email https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file',
};

export interface UserInfo {
    info: {
        sub: string
        email: string,
        name: string,
        picture: string
    }
}

@Injectable({
    providedIn: 'root'
})
export class GoogleApiService {

    gmail = 'https://gmail.googleapis.com'
    private readonly uploadURL = 'https://www.googleapis.com/upload/drive/v3/files';
    private readonly getFilesUrl = 'https://www.googleapis.com/drive/v3/files';

    userProfileSubject = new Subject<UserInfo>()

    constructor(private readonly oAuthService?: OAuthService, private readonly httpClient?: HttpClient) { }

    public connectCloud(): void {
        this.oAuthService.configure(authCodeFlowConfig);
        this.oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";
        this.oAuthService.loadDiscoveryDocument().then(() => {
            this.oAuthService.tryLoginImplicitFlow().then(() => {
                if (!this.oAuthService.hasValidAccessToken()) {
                    this.oAuthService.initLoginFlow()
                } else {
                    this.oAuthService.loadUserProfile().then((userProfile) => {
                        this.userProfileSubject.next(userProfile as UserInfo)
                    })
                }
            })
        });
    }

    public uploadFile(event: any, isUltraSecure: boolean): Observable<any> {
        return from(new DriveOperationClient(this.oAuthService, this.httpClient).uploadFile(event, isUltraSecure));
    };

    public downloadFile(fileId: string, fileName: string): Observable<any> {
        return from(new DriveOperationClient(this.oAuthService, this.httpClient).downloadFile(fileId, fileName));
    };

    public getAllFiles(): Observable<Object> {
        return new DriveOperationBackEndClient(this.oAuthService, this.httpClient).getAllFiles();
    };

    public getFileById(fileId: string): Observable<Object> {
        return new DriveOperationBackEndClient(this.oAuthService, this.httpClient).getFileById(fileId);
    };

    public deleteFile(fileId: string): Observable<Object> {
        return new DriveOperationBackEndClient(this.oAuthService, this.httpClient).deleteFile(fileId);
    };

    public isLoggedIn(): boolean {
        return new DriveOperationBackEndClient(this.oAuthService, this.httpClient).isLoggedIn();
    };

    public signOut(): void {
        new DriveOperationBackEndClient(this.oAuthService, this.httpClient).signOut();
    };
}
