import { environment } from "src/environments/environment";
import { Result } from "../../models/results/Result";
import { RestCalls } from "../restOperations/RestCalls";
import { VerifyOtpRequest } from "../../models/requests/VerifyOtpRequest";
import { VerifyOtpResult } from "../../models/results/VerifyOtpResult";

export class AuthenticationBackendClient{

    restCalls: RestCalls;
    constructor() {
        this.restCalls = new RestCalls()
    }

    public sendOtp(userId: string): Promise<Result> {
        return new Promise(async (resolve, reject) => {
            let sendOtpResult = new Result();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/otp/send/${userId}`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.PUT(completeUrl);
                if (restResult.errorCode == 0) {
                    sendOtpResult.errorCode = 0;
                    sendOtpResult.errorMessage = restResult.errorMessage;
                    resolve(sendOtpResult);
                }
                else {
                    sendOtpResult.errorCode = 1;
                    sendOtpResult.errorMessage = "Something went wrong.";
                    reject(sendOtpResult);
                }
                resolve(sendOtpResult);
            }
            catch (err) {
                reject(sendOtpResult);
            }
        })
    }

    public verifyOtp(verifyOtpRequest: VerifyOtpRequest): Promise<VerifyOtpResult> {
        return new Promise(async (resolve, reject) => {
            let verifyOtpResult = new VerifyOtpResult();
            try {
                let baseUrl = environment.baseUrl;
                let relativeUrl = `/otp/verify/`;
                let completeUrl = baseUrl + relativeUrl;
                let restResult = await this.restCalls.PUT(completeUrl, verifyOtpRequest);
                if (restResult.errorCode == 0) {
                    verifyOtpResult.errorCode = 0;
                    verifyOtpResult.errorMessage = restResult.errorMessage;
                    verifyOtpResult.otpHashIdentical = restResult.otpHashIdentical;
                    resolve(verifyOtpResult);
                }
                else {
                    verifyOtpResult.errorCode = 1;
                    verifyOtpResult.errorMessage = "Something went wrong.";
                    verifyOtpResult.otpHashIdentical = restResult.otpHashIdentical;
                    reject(verifyOtpResult);
                }
                resolve(verifyOtpResult);
            }
            catch (err) {
                reject(verifyOtpResult);
            }
        })
    }

}