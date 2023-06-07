import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { DriveOperationBackEndClient } from '../backendClient/DriveOperationBackEndClient';
import { BesafeCrypto } from '../utils/BesafeCrypto';
import { UploadResult } from '../../models/results/UploadResult';
import { Result } from '../../models/results/Result';
import { Conversion } from '../utils/Conversion';
import { SmartContractService } from '../../services/backend/smart-contract.service';

export class DriveOperationClient {
    constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient, private smartContractService?: SmartContractService) { }

    uploadFile(event: any, isUltraSecure: boolean): Promise<any> {
        let uploadResult = new UploadResult();
        return new Promise<any>((resolve, reject) => {
            const file: File = event.target.files[0];
            let encryptedBlob: Blob;
            let encryptedArrayBuffer: ArrayBuffer;
            new Conversion().convertFileToArrayBuffer(file).subscribe(
                async arrayBuffer => {
                    encryptedArrayBuffer = new BesafeCrypto().encryptArrayBuffer(arrayBuffer);
                    encryptedBlob = new Blob([encryptedArrayBuffer], { type: file.type });
                    let res = await new DriveOperationBackEndClient(this.oAuthService, this.httpClient).uploadFile(encryptedBlob, file)
                    uploadResult.id = res.id;
                    uploadResult.name = res.name;
                    uploadResult.mimeType = res.mimeType;
                    if (isUltraSecure) {
                        this.uploadToBlockChain(uploadResult.id, encryptedArrayBuffer);
                    }
                    resolve(uploadResult);
                }
            );
            console.log("encryptedBlob: ", encryptedBlob);
        })
    }

    uploadToBlockChain(fileId: string, encryptedArrayBuffer: ArrayBuffer) {
        const decoder = new TextDecoder();
        const encryptedString = decoder.decode(encryptedArrayBuffer);
        this.smartContractService.connectToMetamask().subscribe(res => {
            this.smartContractService.addFile(fileId, encryptedString).subscribe(res => {
                console.log("Uploaded in Blockchain")
            })
        })
    }

    downloadFile(fileId: string, fileName: string): Promise<Result> {
        return new Promise((resolve, reject) => {
            let result = new Result();
            new DriveOperationBackEndClient(this.oAuthService, this.httpClient).downloadFile(fileId).subscribe(
                (response: Blob) => {
                    console.log("response: ", response)
                    const eFile = new File([response], fileName, { type: response.type } as FilePropertyBag);
                    let decrptedarraybuffer;
                    new Conversion().convertBlobToArrayBuffer(response)
                        .then(arrayBuffer => {
                            decrptedarraybuffer = arrayBuffer;
                            console.log("arrayBuffer: ", arrayBuffer);
                            const decryptedArrayBuffer = new BesafeCrypto().decryptArrayBuffer(decrptedarraybuffer);
                            const decryptedBlob = new Blob([decryptedArrayBuffer], { type: eFile.type });
                            const file = new File([decryptedBlob], fileName, { type: response.type } as FilePropertyBag);
                            const link = document.createElement('a');
                            link.href = window.URL.createObjectURL(file);
                            link.download = fileName;
                            link.click();
                            result.errorCode = 0;
                            result.errorMessage = "File downloaded successfully";
                            console.log('File downloaded: ', response);
                        })
                        .catch(error => {
                            console.error('Error converting Blob to ArrayBuffer:', error);
                        });
                    resolve(result);
                },
                (error) => {
                    console.error('Error downloading file:', error);
                }
            );

        })
    };
}