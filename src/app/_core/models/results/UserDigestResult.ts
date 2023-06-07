import { Result } from "./Result";

export class UserDigestResult extends Result{
    userDigest: string;

    constructor(userDigest?: string){
        super();
        this.userDigest = userDigest;
    }
}