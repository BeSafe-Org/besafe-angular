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

export class DriveOperationClient {
    constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) { }

    uploadFile(event: any, isUltraSecure: boolean): Promise<any> {

        let uploadResult = new UploadResult();
        return new Promise<any>(async (resolve, reject) => {
            // const file: File = event.target.files[0];
            // let encryptedBlob: Blob;
            // let encryptedArrayBuffer: ArrayBuffer;
            // new Conversion().convertFileToArrayBuffer(file).subscribe(
            //     async arrayBuffer => {
            //         encryptedArrayBuffer = new BesafeCrypto().encryptArrayBuffer(arrayBuffer);
            //         encryptedBlob = new Blob([encryptedArrayBuffer], { type: file.type });
            //         let res = await new DriveOperationBackEndClient(this.oAuthService, this.httpClient).uploadFile(encryptedBlob, file)
            //         uploadResult.id = res.id;
            //         uploadResult.name = res.name;
            //         uploadResult.mimeType = res.mimeType;
            //         if (isUltraSecure) {
            //             await this.uploadToBlockChain(uploadResult.id, uploadResult.name, uploadResult.mimeType, encryptedArrayBuffer);
            //         }
            //         resolve(uploadResult);
            //     }
            // );
            // console.log("encryptedBlob: ", encryptedBlob);
            
            console.log("Upload Process started: ");
            const file = event.target.files[0];
            const fileContent = await this.readFileContent(file);
            const encryptedContent = await new AesCrypto().encryptAES(fileContent, this.password);
            const encryptedBlob = new Blob([encryptedContent], { type: 'application/octet-stream' });
            let res = await new DriveOperationBackEndClient(this.oAuthService, this.httpClient).uploadFile(encryptedBlob, file)
            uploadResult.id = res.id;
            uploadResult.name = res.name;
            uploadResult.mimeType = res.mimeType;
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
        let res = await new SmartContracts().addFile(fileId, arrayBuffer)
    }

    downloadFile(fileId: string, fileName: string): Promise<Result> {
        return new Promise((resolve, reject) => {

            console.log("File Download Started:")
            let result = new Result();
            new DriveOperationBackEndClient(this.oAuthService, this.httpClient).downloadFile(fileId).subscribe(
                async (response: Blob) => {
                    console.log("response: ", response)
                    const eFile = new File([response], fileName, { type: response.type } as FilePropertyBag);
                    let decrptedarraybuffer;
                    new Conversion().convertBlobToArrayBuffer(response)
                        .then(async arrayBuffer => {
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

                    // const file = new File([response], fileName, { type: response.type } as FilePropertyBag);
                    // const fileContent = await this.readFileContent(file);
                    // const decryptedContent = await new AesCrypto().decryptAES(fileContent, this.password);
                    // const decryptedBlob = new Blob([decryptedContent], { type: file.type });
                    // const decryptedFile = new File([decryptedBlob], file.name.substring(0, file.name.lastIndexOf('.enc')));

                    // const link = document.createElement('a');
                    // link.href = URL.createObjectURL(decryptedFile);
                    // link.download = decryptedFile.name;
                    // link.click();
                    // result.errorCode = 0;
                    // result.errorMessage = "File downloaded successfully";
                    // resolve(result);
                },
                (error) => {
                    console.error('Error downloading file:', error);
                }
            );

        })
    };



    password: "master key from localstore";

    async decryptFile() {
        const fileInput = (document.querySelector('input[type=file]') as HTMLInputElement);
        if (fileInput.files.length === 0) {
            alert('Please select a file.');
            return;
        }


        //download Blob
        // const encryptedFile = new File([encryptedBlob], file.name + '.enc');

        const file = fileInput.files[0];
        const fileContent = await this.readFileContent(file);
        const decryptedContent = await new AesCrypto().decryptAES(fileContent, this.password);
        const decryptedBlob = new Blob([decryptedContent], { type: file.type });
        const decryptedFile = new File([decryptedBlob], file.name.substring(0, file.name.lastIndexOf('.enc')));
        // this.downloadFile2(decryptedFile);
    }

    readFileContent(file: File): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
}