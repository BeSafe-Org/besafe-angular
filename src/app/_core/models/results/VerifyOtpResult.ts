import { Result } from "./Result";

export class VerifyOtpResult extends Result{
    otpHashIdentical: boolean;

    constructor(otpHashIdentical?: boolean){
        super();
        this.otpHashIdentical = otpHashIdentical;
    }
}