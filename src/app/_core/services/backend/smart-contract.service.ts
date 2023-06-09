import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SmartContracts } from '../../client/backendClient/SmartContractsBackendClient';
import { Conversion } from '../../client/utils/Conversion';


declare const window: any;

@Injectable({
    providedIn: 'root'
})
export class SmartContractService {

    window: any;
    address: string = "";
    abi: any[] = [];

    constructor() {
        this.address = environment.address;
        this.abi = environment.abi;
    }

    public connectToMetamask(): Observable<string> {
        return from(new SmartContracts().connectToMetamask());
    };

    public addFile(fileId: string, fileData: string) {
        return from(new SmartContracts().addFile(fileId, fileData));
    }

    public getFile(fileId: string) {
        return from(new SmartContracts().getFile(fileId));
    }



}