export class VerifyOtpRequest {
    userId: string;
    otpHash: string;
    constructor(userId?: string, otpHash?: string) {
        this.userId = userId;
        this.otpHash = otpHash;
    }
}