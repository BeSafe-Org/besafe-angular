import { environment } from "src/environments/environment";
import { CheckIfUserExistsResult } from "../../models/CheckIfUserExistsResult";
import { RestCalls } from "../restOperations/RestCalls";

export class UserManagement {

    restCalls: RestCalls;
    constructor() {
        this.restCalls = new RestCalls()
    }

    public checkIfUserExists(userId: string): Promise<CheckIfUserExistsResult> {
        return new Promise(async (resolve, reject) => {
            try {
                let checkIfUserExistsResult = new CheckIfUserExistsResult();
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/exists${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.errorCode == 0) {
                    checkIfUserExistsResult.errorCode = 0;
                    checkIfUserExistsResult.errorMessage = restResult.errorMessage;
                    checkIfUserExistsResult.userExists = restResult.userExists
                    resolve(checkIfUserExistsResult);
                }
                else if (restResult.errorCode == 409) {
                    checkIfUserExistsResult.errorCode = 1;
                    checkIfUserExistsResult.errorMessage = "Employee Id already exists.";
                    checkIfUserExistsResult.userExists = restResult.userExists
                    reject(checkIfUserExistsResult);
                }
                else {
                    checkIfUserExistsResult.errorCode = 1;
                    checkIfUserExistsResult.errorMessage = "Something went wrong.";
                    reject(checkIfUserExistsResult);
                }
                resolve(checkIfUserExistsResult);
            }
            catch (err) {
                reject(this.checkIfUserExists);
            }
        })
    }

    public generateUserSalt(userId: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let checkIfUserExistsResult = new CheckIfUserExistsResult();
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/exists${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.errorCode == 0) {
                    checkIfUserExistsResult.errorCode = 0;
                    checkIfUserExistsResult.errorMessage = restResult.errorMessage;
                    checkIfUserExistsResult.userExists = restResult.userExists
                    resolve(checkIfUserExistsResult);
                }
                else if (restResult.errorCode == 409) {
                    checkIfUserExistsResult.errorCode = 1;
                    checkIfUserExistsResult.errorMessage = "Employee Id already exists.";
                    checkIfUserExistsResult.userExists = restResult.userExists
                    reject(checkIfUserExistsResult);
                }
                else {
                    checkIfUserExistsResult.errorCode = 1;
                    checkIfUserExistsResult.errorMessage = "Something went wrong.";
                    reject(checkIfUserExistsResult);
                }
                resolve(checkIfUserExistsResult);
            }
            catch (err) {
                reject(this.checkIfUserExists);
            }
        })
    }

    public getUserSalt(userId: string) {
        return new Promise((resolve, reject) => {
            resolve({});
        })
    }

    public setUserDigest(user: string) {
        return new Promise((resolve, reject) => {
            resolve({});
        })
    }

    public getUserDigest(user: string) {
        return new Promise((resolve, reject) => {
            resolve({});
        })
    }
}