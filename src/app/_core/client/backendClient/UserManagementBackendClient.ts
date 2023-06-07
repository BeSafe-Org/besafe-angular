import { environment } from "src/environments/environment";
import { CheckIfUserExistsResult } from "../../models/CheckIfUserExistsResult";
import { RestCalls } from "../restOperations/RestCalls";
import { UserSaltResult } from "../../models/UserSaltResult";
import { User } from "../../models/User";
import { Result } from "../../models/Result";
import { UserDigestResult } from "../../models/UserDigestResult";

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
                let relativeUrl = `/user/exists/${userId}`;
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
                    checkIfUserExistsResult.errorMessage = "Success";
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
            let userSaltResult = new UserSaltResult();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/salt/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.PUT(completeUrl);
                if (restResult.errorCode == 0) {
                    userSaltResult.errorCode = 0;
                    userSaltResult.errorMessage = restResult.errorMessage;
                    userSaltResult.userSalt = restResult.userSalt
                    resolve(userSaltResult);
                }
                else {
                    userSaltResult.errorCode = 1;
                    userSaltResult.errorMessage = "Something went wrong.";
                    reject(userSaltResult);
                }
                resolve(userSaltResult);
            }
            catch (err) {
                reject(userSaltResult);
            }
        })
    }

    public getUserSalt(userId: string) {
        return new Promise(async (resolve, reject) => {
            let userSaltResult = new UserSaltResult();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/salt${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.errorCode == 0) {
                    userSaltResult.errorCode = 0;
                    userSaltResult.errorMessage = restResult.errorMessage;
                    userSaltResult.userSalt = restResult.userSalt
                    resolve(userSaltResult);
                }
                else {
                    userSaltResult.errorCode = 1;
                    userSaltResult.errorMessage = "Something went wrong.";
                    reject(userSaltResult);
                }
                resolve(userSaltResult);
            }
            catch (err) {
                reject(userSaltResult);
            }
        })
    }

    public setUserDigest(user: User) {
        return new Promise(async (resolve, reject) => {
            let userDigestResult = new Result();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/digest`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.PUT(completeUrl, user);
                if (restResult.errorCode == 0) {
                    userDigestResult.errorCode = 0;
                    userDigestResult.errorMessage = restResult.errorMessage;
                    resolve(userDigestResult);
                }
                else {
                    userDigestResult.errorCode = 1;
                    userDigestResult.errorMessage = "Something went wrong.";
                    reject(userDigestResult);
                }
                resolve(userDigestResult);
            }
            catch (err) {
                reject(userDigestResult);
            }
        })
    }

    public getUserDigest(userId: string) {
        return new Promise(async (resolve, reject) => {
            let userDigestResult = new UserDigestResult();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/digest/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.errorCode == 0) {
                    userDigestResult.errorCode = 0;
                    userDigestResult.errorMessage = restResult.errorMessage;
                    userDigestResult.userDigest = restResult.userDigest
                    resolve(userDigestResult);
                }
                else {
                    userDigestResult.errorCode = 1;
                    userDigestResult.errorMessage = "Something went wrong.";
                    reject(userDigestResult);
                }
                resolve(userDigestResult);
            }
            catch (err) {
                reject(userDigestResult);
            }
        })
    }
}