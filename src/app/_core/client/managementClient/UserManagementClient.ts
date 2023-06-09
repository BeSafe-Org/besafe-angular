import { User } from "../../models/entities/User";
import { Result } from "../../models/results/Result";
import { AuthenticationBackendClient } from "../backendClient/AuthenticationBackendClient";
import { UserManagementBackendClient } from "../backendClient/UserBackendClient"
import { AesCrypto } from "../utils/AesCrypto";
import { LocalStorage } from "../utils/LocalStorage";

export class UserManagementClient {

    userManagementBackendClient: UserManagementBackendClient;

    constructor() {
        this.userManagementBackendClient = new UserManagementBackendClient();
    }



    createUserAccount(userId: string, userPassword: string): Promise<Result> {
        return new Promise(async (resolve, reject) => {
            let result = new Result();
            let userSaltResult = await this.userManagementBackendClient.generateUserSalt(userId);
            if (userSaltResult.userSalt) {
                let digest = new AesCrypto().sha256(userPassword + userSaltResult.userSalt);
                let storeDigestResult = new Result();
                let user = new User();
                user.userId = userId
                user.userEmail = userId
                user.userDigest = digest;
                storeDigestResult = await this.userManagementBackendClient.storeUserDigest(user);
                if (storeDigestResult.errorCode === 0) {
                    let masterKey = new AesCrypto().generateUserKey(userId + userPassword, userSaltResult.userSalt);
                    new LocalStorage().addItem("masterKey", masterKey);
                    new LocalStorage().addItem("userId", userId);
                    result.errorCode = 0;
                    result.errorMessage = "User account created successfully!";
                    resolve(result)
                }
                else {
                    result.errorCode = 1;
                    result.errorMessage = "Something went wrong!";
                    reject(result);
                }
            }
            else {
                result.errorCode = 1;
                result.errorMessage = "Something went wrong!";
                reject(result);
            }
        })
    }

    verifyUserAccount(userId: string, userPassword: string) {
        return new Promise(async (resolve, reject) => {
            let result = new Result();
            let checkIfUserExists = await this.userManagementBackendClient.checkIfUserExists(userId);
            if (checkIfUserExists.userExists) {
                let userSaltResult = await this.userManagementBackendClient.getUserSalt(userId);
                if (userSaltResult.userSalt) {
                    let digest = new AesCrypto().sha256(userPassword + userSaltResult.userSalt);
                    let storeDigestResult = new Result();
                    let user = new User();
                    user.userId = userId
                    user.userEmail = userId
                    user.userDigest = digest;
                    storeDigestResult = await this.userManagementBackendClient.verifyDigest(user);
                    if (storeDigestResult.errorCode == 1) {
                        result.errorCode = 1;
                        result.errorMessage = "Something went wrong!";
                        reject(result);
                    }
                    let masterKey = new AesCrypto().generateUserKey(userId + userPassword, userSaltResult.userSalt);
                    new LocalStorage().addItem("masterKey", masterKey);
                    new LocalStorage().addItem("userId", userId);
                    resolve(storeDigestResult);
                }
                else {
                    result.errorCode = 1;
                    result.errorMessage = "Something went wrong!";
                    reject(result);
                }
            }
            else {
                result.errorCode = 404;
                result.errorMessage = "User not exists!";
                reject(result);
                return;
            }
        })
    }
}