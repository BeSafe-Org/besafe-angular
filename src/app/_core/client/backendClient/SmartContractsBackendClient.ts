import Web3 from "web3";
import { environment } from 'src/environments/environment';

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

    public async connectToMetamask(): Promise<string> {
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


    public async addFile(fileId: string, fileData: string): Promise<any> {
        try {
            const contract = new window.web3.eth.Contract(this.abi, this.address);
            const accounts = await this.getAccounts();
            const result = await contract.methods.addFile(fileId, fileData).send({ from: accounts[0] });
            return result;
        } catch (error) {
            console.log("Error:", error);
        }
    }

    public async getFile(fileId: string): Promise<any> {
        try {
            const contract = new window.web3.eth.Contract(this.abi, this.address);
            const file = await contract.methods.files(fileId).call();
            return file;
        } catch (error) {
            return null;
        }
    }
}