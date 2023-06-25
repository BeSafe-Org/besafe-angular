import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { DriveOperationBackEndClient } from '../backendClient/DriveOperationBackEndClient';
import { BesafeCrypto } from '../utils/BesafeCrypto';
import { UploadResult } from '../../models/results/UploadResult';
import { Result } from '../../models/results/Result';
import { Conversion } from '../utils/Conversion';
import { SmartContractService } from '../../services/backend/smart-contract.service';
import { SmartContracts } from '../backendClient/SmartContractsBackendClient';
import { AesCrypto } from '../utils/AesCrypto';
import { LocalStorage } from '../utils/LocalStorage';

export class DriveOperationClient {
    constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) { }

    password = new LocalStorage().getItem("masterKey");

    uploadFile(event: any, isUltraSecure: boolean): Promise<any> {
        let uploadResult = new UploadResult();
        return new Promise<any>(async (resolve, reject) => {
            console.log("Upload Process started: ");
            const file = event.target.files[0];
            const fileContent = await new Conversion().readFileContent(file);
            const encryptedContent = await new AesCrypto().encryptAES(fileContent, this.password);
            const encryptedBlob = new Blob([encryptedContent], { type: 'application/octet-stream' });
            let res = await new DriveOperationBackEndClient(this.oAuthService, this.httpClient).uploadFile(encryptedBlob, file)
            uploadResult.id = res.id;
            uploadResult.name = res.name;
            uploadResult.mimeType = res.mimeType;
            if (isUltraSecure) {
                const fileReader = new FileReader();

                
                    await new SmartContracts().addFile(uploadResult.id, encryptedBlob);
                  
            }
            resolve(uploadResult);
        })
    }

    async uploadToBlockChain(fileId: string, fileName: string, type: string, encryptedArrayBuffer: ArrayBuffer) {
        let arrayBuffer: ArrayBuffer;
        const decryptedArrayBuffer = new BesafeCrypto().decryptArrayBuffer(encryptedArrayBuffer);
        const decryptedBlob = new Blob([decryptedArrayBuffer], { type: type });
        const file = new File([decryptedBlob], fileName, { type: type } as FilePropertyBag);
        console.log(file);
        const reader: FileReader = new FileReader();
        reader.onload = () => {
            arrayBuffer = reader.result as ArrayBuffer;
            console.log("ArrayBuffer to send: ", arrayBuffer);
        };
        reader.readAsArrayBuffer(file);
        // let res = await new SmartContracts().addFile(fileId, arrayBuffer)
    }

    downloadFile(fileId: string, fileName: string): Promise<Result> {
        return new Promise((resolve, reject) => {
            let result = new Result();
            new DriveOperationBackEndClient(this.oAuthService, this.httpClient).downloadFile(fileId).subscribe(
                async (response: Blob) => {
                    console.log("response: ", response)
                    const eFile = new File([response], fileName, { type: response.type } as FilePropertyBag);
                    let decrptedarraybuffer;
                    new Conversion().convertBlobToArrayBuffer(response)
                        .then(async arrayBuffer => {

                            let encryptedUltraSafeFile = await new SmartContracts().getFile(fileId);
                            console.log("encryptedUltraSafeFile", encryptedUltraSafeFile);
                            
                            decrptedarraybuffer = arrayBuffer;
                            console.log("arrayBuffer: ", arrayBuffer);
                            const decryptedArrayBuffer = await new AesCrypto().decryptAES(decrptedarraybuffer, this.password);
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
                },
                (error) => {
                    console.error('Error downloading file:', error);
                }
            );

        })
    };
}