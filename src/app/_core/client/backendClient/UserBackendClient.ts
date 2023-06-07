import { environment } from "src/environments/environment";
import { CheckIfUserExistsResult } from "../../models/results/CheckIfUserExistsResult";
import { RestCalls } from "../restOperations/RestCalls";
import { UserSaltResult } from "../../models/results/UserSaltResult";
import { User } from "../../models/entities/User";
import { Result } from "../../models/results/Result";

export class UserManagementBackendClient {

    restCalls: RestCalls;
    constructor() {
        this.restCalls = new RestCalls()
    }

    public checkIfUserExists(userId: string): Promise<CheckIfUserExistsResult> {
        return new Promise(async (resolve, reject) => {
            let checkIfUserExistsResult = new CheckIfUserExistsResult();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/exists/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.GET(completeUrl);
                if (restResult.errorCode == 0) {
                    checkIfUserExistsResult.errorCode = 0;
                    checkIfUserExistsResult.errorMessage = restResult.errorMessage;
                    checkIfUserExistsResult.userExists = restResult.userExists
                    resolve(checkIfUserExistsResult);
                    return;
                }
                else {
                    checkIfUserExistsResult.errorCode = 1;
                    checkIfUserExistsResult.errorMessage = "Something went wrong.";
                    reject(checkIfUserExistsResult);
                }
            }
            catch (err) {
                reject(checkIfUserExistsResult);
            }
        })
    }

    public generateUserSalt(userId: string): Promise<UserSaltResult> {
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
            }
            catch (err) {
                reject(userSaltResult);
            }
        })
    }

    public getUserSalt(userId: string): Promise<UserSaltResult> {
        return new Promise(async (resolve, reject) => {
            let userSaltResult = new UserSaltResult();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/salt/${userId}`;
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
            }
            catch (err) {
                reject(userSaltResult);
            }
        })
    }

    public storeUserDigest(user: User): Promise<Result> {
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

    public verifyDigest(user: User): Promise<Result> {
        return new Promise(async (resolve, reject) => {
            let userDigestResult = new Result();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/user/digest/`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.POST(completeUrl, user);
                if (restResult.errorCode == 0) {
                    userDigestResult.errorCode = 0;
                    userDigestResult.errorMessage = restResult.errorMessage;
                    resolve(userDigestResult);
                }
                else if(restResult.errorCode == 406){
                    userDigestResult.errorCode = 406;
                    userDigestResult.errorMessage = "Digest does not match";
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