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

    // uploadFile(event: any, isUltraSecure: boolean): Promise<any> {
    //     let uploadResult = new UploadResult();
    //     return new Promise<any>((resolve, reject) => {
    //         const file: File = event.target.files[0];
    //         let encryptedBlob: Blob;
    //         let encryptedArrayBuffer: ArrayBuffer;
    //         new Conversion().convertFileToArrayBuffer(file).subscribe(
    //             async arrayBuffer => {
    //                 encryptedArrayBuffer = new BesafeCrypto().encryptArrayBuffer(arrayBuffer);
    //                 encryptedBlob = new Blob([encryptedArrayBuffer], { type: file.type });
    //                 let res = await new DriveOperationBackEndClient(this.oAuthService, this.httpClient).uploadFile(encryptedBlob, file)
    //                 uploadResult.id = res.id;
    //                 uploadResult.name = res.name;
    //                 uploadResult.mimeType = res.mimeType;
    //                 if (isUltraSecure) {
    //                     await this.uploadToBlockChain(uploadResult.id, uploadResult.name, uploadResult.mimeType, encryptedArrayBuffer);
    //                 }
    //                 resolve(uploadResult);
    //             }
    //         );
    //         console.log("encryptedBlob: ", encryptedBlob);
    //     })
    // }

    // async uploadToBlockChain(fileId: string, fileName: string, type: string, encryptedArrayBuffer: ArrayBuffer) {
    //     let arrayBuffer: ArrayBuffer;
    //     const decryptedArrayBuffer = new BesafeCrypto().decryptArrayBuffer(encryptedArrayBuffer);
    //     const decryptedBlob = new Blob([decryptedArrayBuffer], { type: type });
    //     const file = new File([decryptedBlob], fileName, { type: type } as FilePropertyBag);
    //     console.log(file);
    //     const reader: FileReader = new FileReader();
    //     reader.onload = () => {
    //         arrayBuffer = reader.result as ArrayBuffer;
    //         console.log("ArrayBuffer to send: ", arrayBuffer);
    //     };
    //     reader.readAsArrayBuffer(file);
    //     let res = await new SmartContracts().addFileArrayBuffer(fileId, decryptedArrayBuffer)
    // }

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
                this.uploadToBlockChain(uploadResult.id, uploadResult.name, uploadResult.mimeType, fileContent);
            }
            resolve(uploadResult);
        })
    }

    async uploadToBlockChain(fileId: string, fileName: string, type: string, fileContent: ArrayBuffer) {
        const uint8Array = new Uint8Array(fileContent);
        let binaryString = '';
        uint8Array.forEach((byte) => {
            binaryString += String.fromCharCode(byte);
        });
        const base64String: string = btoa(binaryString);
        // console.log("base64String: ", base64String);

        let normalString = atob(base64String);
        const encryptedContent = await new AesCrypto().encrypt(normalString, this.password);

        let res = await new SmartContracts().addFileArrayBuffer(fileId, fileContent);

        // let res = await new SmartContracts().addFile(fileId, encryptedContent);
        console.log(encryptedContent.substring(0, 50));

        let getRes = await new SmartContracts().getFile(fileId);

        const decryptedContent = await new AesCrypto().decrypt(getRes, this.password);
        // const decryptedContent = await new AesCrypto().decrypt(encryptedContent, this.password);
        var dbase64String = btoa(decryptedContent);
        const length = dbase64String.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        let arrayBuffer = bytes.buffer;
        const decryptedBlob = new Blob([arrayBuffer], { type: type });
        const file = new File([decryptedBlob], fileName, { type: type } as FilePropertyBag);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.download = fileName;
        link.click();
    }

    downloadFile(fileId: string, fileName: string): Promise<Result> {
        return new Promise(async (resolve, reject) => {
            let isUltraSecure = true;
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