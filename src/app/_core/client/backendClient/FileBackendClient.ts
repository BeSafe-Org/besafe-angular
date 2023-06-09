import { environment } from "src/environments/environment";
import { Result } from "../../models/results/Result";
import { RestCalls } from "../restOperations/RestCalls";
import { BeSafeFile } from "../../models/entities/File";
import { FileCategory } from "../../models/entities/FileCategory";
import { GoogleApiService } from "../../services/backend/google-api.service";

export class FileBackendClient {

    restCalls: RestCalls;
    constructor() {
        this.restCalls = new RestCalls()
    }

    addFileMetaData(newFile: BeSafeFile): Promise<Result> {
        return new Promise(async (resolve, reject) => {
            let addFileResult = new Result();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/file/add`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.PUT(completeUrl, newFile);
                if (restResult.errorCode == 0) {
                    addFileResult.errorCode = 0;
                    addFileResult.errorMessage = restResult.errorMessage;
                    resolve(addFileResult);
                }
                else {
                    addFileResult.errorCode = 1;
                    addFileResult.errorMessage = "Something went wrong.";
                    reject(addFileResult);
                }
                resolve(addFileResult);
            }
            catch (err) {
                reject(addFileResult);
            }
        })
    }

    updateFileMetaData(file: BeSafeFile): Promise<Result> {
        return new Promise(async (resolve, reject) => {
            let addFileResult = new Result();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/file/update`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.POST(completeUrl, file);
                if (restResult.errorCode == 0) {
                    addFileResult.errorCode = 0;
                    addFileResult.errorMessage = restResult.errorMessage;
                    resolve(addFileResult);
                }
                else {
                    addFileResult.errorCode = 1;
                    addFileResult.errorMessage = "Something went wrong.";
                    reject(addFileResult);
                }
                resolve(addFileResult);
            }
            catch (err) {
                reject(addFileResult);
            }
        })
    }


    deleteFileMetaData(fileId: string): Promise<Result> {
        return new Promise(async (resolve, reject) => {
            let deleteFileResult = new Result();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/file/delete/${fileId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.DELETE(completeUrl);
                if (restResult.errorCode == 0) {
                    deleteFileResult.errorCode = 0;
                    deleteFileResult.errorMessage = restResult.errorMessage;
                    resolve(deleteFileResult);
                }
                else {
                    deleteFileResult.errorCode = 1;
                    deleteFileResult.errorMessage = "Something went wrong.";
                    reject(deleteFileResult);
                }
                resolve(deleteFileResult);
            }
            catch (err) {
                reject(deleteFileResult);
            }
        })
    }

    searchFileByToken(userId: string, category: FileCategory, searchToken: string): Promise<BeSafeFile[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/files/${category}/${userId}/${searchToken}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.length > 0) {
                    resolve(restResult);
                }
                else {
                    resolve([]);
                }
            }
            catch (err) {
                reject([]);
            }
        })
    }

    getAllFiles(userId: string): Promise<BeSafeFile[]> {
        let temp = localStorage.getItem("isCloudConnected");

        if (temp == "true") {
            new GoogleApiService().loadProFile();
        }
        return new Promise(async (resolve, reject) => {
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/files/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.length > 0) {
                    resolve(restResult);
                }
                else {
                    resolve([]);
                }
            }
            catch (err) {
                reject([]);
            }
        })
    }

    getStarredFiles(userId: string): Promise<BeSafeFile[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/files/starred/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.length > 0) {
                    resolve(restResult);
                }
                else {
                    resolve([]);
                }
            }
            catch (err) {
                reject([]);
            }
        })
    }

    getUltraSecureFiles(userId: string): Promise<BeSafeFile[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/files/ultrasafe/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.length > 0) {
                    resolve(restResult);
                }
                else {
                    resolve([]);
                }
            }
            catch (err) {
                reject([]);
            }
        })
    }

    getDeletedFiles(userId: string): Promise<BeSafeFile[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/files/deleted/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.length > 0) {
                    resolve(restResult);
                }
                else {
                    resolve([]);
                }
                resolve([]);
            }
            catch (err) {
                reject([]);
            }
        })
    }
}