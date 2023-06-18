import Web3 from "web3";
import { environment } from 'src/environments/environment';
import { Conversion } from "../utils/Conversion";

declare const window: any;

export class SmartContracts {

    window: any;
    address: string = "";
    abi: any[] = [];

    constructor() {
        this.address = environment.address;
        this.abi = environment.abi;
    }

    private async getAccounts(): Promise<string[]> {
        try {
            return await window.ethereum.request({ method: 'eth_accounts' });
        } catch (e) {
            return [];
        }
    }

    // public async connectToMetamask(): Promise<string> {
    //     window.web3 = new Web3(window.ethereum);
    //     let addresses = await this.getAccounts();
    //     if (addresses.length > 0) {
    //         try {
    //             addresses = await window.ethereum.enable();
    //         } catch (e) {
    //             return null;
    //         }
    //     } else {
    //         addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     }
    //     return addresses.length ? addresses[0] : null;
    // };

    public async connectToMetamask(): Promise<string> {
        if (typeof window.ethereum === 'undefined') {
            return 'MetaMask is not installed. Please install MetaMask to connect.';
        }

        window.web3 = new Web3(window.ethereum);
        let addresses = await this.getAccounts();

        if (addresses.length > 0) {
            try {
                addresses = await window.ethereum.enable();
            } catch (e) {
                return null;
            }
        } else {
            addresses = await window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        return addresses.length ? addresses[0] : null;
    };

    public async addFile(fileId: string, fileData: ArrayBuffer): Promise<any> {
        try {
            let isConnected = await this.connectToMetamask();
            if(isConnected){
                const contract = new window.web3.eth.Contract(this.abi, this.address);
                const accounts = await this.getAccounts();
    
                const hexFileData = this.arrayBufferToHex(fileData);
    
                const result = await contract.methods.addFile(fileId, hexFileData).send({ from: accounts[0] });
                return result;
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    arrayBufferToHex(arrayBuffer: ArrayBuffer) {
        const uint8Array = new Uint8Array(arrayBuffer);
        let hexString = '';
        for (let i = 0; i < uint8Array.length; i++) {
            const hex = uint8Array[i].toString(16).padStart(2, '0');
            hexString += hex;
        }
        return '0x' + hexString;
    }

    public async getFile(fileId: string): Promise<string> {
        try {
            const contract = new window.web3.eth.Contract(this.abi, this.address);
            const file = await contract.methods.files(fileId).call();

            const hexFileData = file.fileData;
            const byteArray = new Uint8Array((hexFileData.length - 2) / 2);

            for (let i = 2, j = 0; i < hexFileData.length; i += 2, j++) {
                byteArray[j] = parseInt(hexFileData.substr(i, 2), 16);
            }
            return new Conversion().arrayBufferToString(byteArray.buffer);
        } catch (error) {
            return null;
        }
    }

    
}