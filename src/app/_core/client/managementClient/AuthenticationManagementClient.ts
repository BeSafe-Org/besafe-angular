import { VerifyOtpRequest } from "../../models/requests/VerifyOtpRequest";
import { Result } from "../../models/results/Result";
import { VerifyOtpResult } from "../../models/results/VerifyOtpResult";
import { AuthenticationBackendClient } from "../backendClient/AuthenticationBackendClient";
import { UserManagementBackendClient } from "../backendClient/UserBackendClient";
import { AesCrypto } from "../utils/AesCrypto";

export class AuthenticationManagementClient {
    userManagementBackendClient: UserManagementBackendClient;
    authenticationBackendClient: AuthenticationBackendClient;

    constructor() {
        this.userManagementBackendClient = new UserManagementBackendClient();
        this.authenticationBackendClient = new AuthenticationBackendClient();
    }

    sendOtp(userId: string) {
        return new Promise(async (resolve, reject) => {
            let result = new Result();
            let checkIfUserExists = await this.userManagementBackendClient.checkIfUserExists(userId);
            if (checkIfUserExists.userExists) {
                result.errorCode = 403;
                result.errorMessage = "User already exists!";
                reject(result);
                return;
            }
            else{
                let sendOtpResult = await this.authenticationBackendClient.sendOtp(userId);
                if(sendOtpResult.errorCode == 0){
                    result.errorCode = 0;
                    result.errorMessage = "Otp sent!";
                    resolve(result);
                }
                else{
                    reject(result);
                }
            }

        })
    }

    verifyOtp(userId: string, otp: string): Promise<VerifyOtpResult> {
        return new Promise(async (resolve, reject) => {
            let verifyOtpResult = new VerifyOtpResult();

            let otpHash = new AesCrypto().sha256(otp);

            let verifyOtpRequest = new VerifyOtpRequest();
            verifyOtpRequest.userId = userId;
            verifyOtpRequest.otpHash = otpHash;

            let sendOtpResult = await this.authenticationBackendClient.verifyOtp(verifyOtpRequest);
            if(sendOtpResult.otpHashIdentical == true){
                resolve(verifyOtpResult);
            }
            else{
                reject(verifyOtpResult);
            }
        })
    }
}